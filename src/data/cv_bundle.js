import { parseStackString } from "@/lib/tech";
import defaultSource from "@/data/cv_source";
import mlSource from "@/data/cv_source_ml";
import campySource from "@/data/cv_source_campy";
import pirxeySource from "@/data/cv_source_pirxey";

const sources = {
  default: defaultSource,
  ml: mlSource,
  campy: campySource,
  pirxey: pirxeySource,
};

function normalizeVariant(variant) {
  if (!variant || typeof variant !== "string") return "default";
  const normalized = variant.trim().toLowerCase();
  return normalized || "default";
}

function resolveSource(variant) {
  const key = normalizeVariant(variant);
  return sources[key] || sources.default;
}

function deepClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizePath(path) {
  return path.replace(/\.\d+/g, "");
}

function mergeArraysById(baseArr, overrideArr, options, path) {
  const baseById = new Map(
    baseArr
      .filter((item) => isObject(item) && item.id)
      .map((item) => [item.id, item]),
  );
  const usedIds = new Set();
  const merged = overrideArr.map((item) => {
    if (isObject(item) && item.id && baseById.has(item.id)) {
      usedIds.add(item.id);
      return deepMerge(baseById.get(item.id), item, options, path);
    }
    return item;
  });
  baseArr.forEach((item) => {
    if (isObject(item) && item.id && usedIds.has(item.id)) return;
    merged.push(item);
  });
  return merged;
}

function shouldMergeById(options, path) {
  const paths = options?.arrayMergeByIdPaths || [];
  const normalized = normalizePath(path);
  return paths.includes(normalized);
}

function deepMerge(baseValue, overrideValue, options, path = "") {
  if (overrideValue === undefined) return baseValue;

  if (Array.isArray(baseValue) && Array.isArray(overrideValue)) {
    if (shouldMergeById(options, path)) {
      return mergeArraysById(baseValue, overrideValue, options, path);
    }
    return overrideValue;
  }

  if (isObject(baseValue) && isObject(overrideValue)) {
    const merged = { ...baseValue };
    Object.keys(overrideValue).forEach((key) => {
      const nextPath = path ? `${path}.${key}` : key;
      merged[key] = deepMerge(baseValue[key], overrideValue[key], options, nextPath);
    });
    return merged;
  }

  return overrideValue;
}

function sortExperienceByMostRecent(experience) {
  return [...experience].sort((a, b) => {
    const aLatest = a?.roles?.[0]?.start || "0000-00";
    const bLatest = b?.roles?.[0]?.start || "0000-00";
    return aLatest < bLatest ? 1 : -1;
  });
}

function mapPortfolioItemsToCvProjects(items, locale) {
  return items.map((item) => {
    const t = item.i18n?.[locale] ?? item.i18n?.en;
    const stack = item.stack || t?.stack || "";
    const tech = parseStackString(stack);

    return {
      name: t?.title ?? item.slug,
      location: item.country || null,
      start: null,
      end: null,
      highlights: t?.description ? [t.description] : [],
      tech,
    };
  });
}

function buildAllowedSkillSet(locale) {
  const base = defaultSource.getBase({ locale });
  const skills = base?.cv?.skills || {};
  const allowed = [
    ...(skills.highlight || []),
    ...(skills.experienced || []),
    ...(skills.favorites || []),
  ].filter(Boolean);
  return new Set(allowed);
}

function filterSkillsByAllowed(items, allowedSet) {
  if (!allowedSet) return items || [];
  return (items || []).filter((item) => allowedSet.has(item));
}

function applyExperienceSelectors(experience, selectors) {
  if (!experience.length) return [];

  let filtered = experience;
  if (selectors?.companyIds?.length) {
    const companyIds = new Set(selectors.companyIds);
    filtered = filtered.filter((item) => companyIds.has(item.id));
  }

  if (selectors?.roleIds?.length) {
    const roleIds = new Set(selectors.roleIds);
    filtered = filtered
      .map((item) => {
        const roles = (item.roles || []).filter((role) => roleIds.has(role.id));
        return { ...item, roles };
      })
      .filter((item) => item.roles?.length);
  }

  if (selectors?.maxHighlightsPerRole) {
    const max = selectors.maxHighlightsPerRole;
    filtered = filtered.map((item) => ({
      ...item,
      roles: (item.roles || []).map((role) => ({
        ...role,
        highlights: (role.highlights || []).slice(0, max),
      })),
    }));
  }

  return filtered;
}

function applyProjectSelectors(portfolioItems, selectors) {
  if (!selectors?.portfolioSlugs?.length) return portfolioItems;
  const bySlug = new Map(portfolioItems.map((item) => [item.slug, item]));
  return selectors.portfolioSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
}

function applySelectors(bundle, selectors, locale) {
  const next = {
    ...bundle,
    cv: { ...bundle.cv },
    portfolioItems: [...(bundle.portfolioItems || [])],
  };

  if (selectors?.experience) {
    next.cv.experience = applyExperienceSelectors(
      next.cv.experience || [],
      selectors.experience,
    );
  }

  if (selectors?.projects) {
    next.portfolioItems = applyProjectSelectors(
      next.portfolioItems,
      selectors.projects,
    );

    if (selectors.projects.mapPortfolioToCvProjects) {
      next.cv.projects = {
        ...next.cv.projects,
        selected: mapPortfolioItemsToCvProjects(next.portfolioItems, locale),
        recentNonProfit: [],
      };
    }
  }

  return next;
}

function normalizeCvBundle(bundle, options, allowedSkills) {
  const cv = bundle.cv || {};
  const baseSkills = cv.skills || { highlight: [], experienced: [], favorites: [] };
  const filteredSkills = {
    ...baseSkills,
    highlight: filterSkillsByAllowed(baseSkills.highlight, allowedSkills),
    experienced: filterSkillsByAllowed(baseSkills.experienced, allowedSkills),
    favorites: filterSkillsByAllowed(baseSkills.favorites, allowedSkills),
  };
  const strongSet = new Set(filteredSkills.highlight);
  filteredSkills.experienced = (filteredSkills.experienced || []).filter(
    (item) => !strongSet.has(item),
  );
  const normalized = {
    ...bundle,
    cv: {
      ...cv,
      experience: Array.isArray(cv.experience) ? cv.experience : [],
      skills: filteredSkills,
      passions: Array.isArray(cv.passions) ? cv.passions : [],
      projects: {
        selected: [],
        recentNonProfit: [],
        ...(cv.projects || {}),
      },
    },
    portfolioItems: Array.isArray(bundle.portfolioItems) ? bundle.portfolioItems : [],
  };

  if (options?.sortExperienceByMostRecent) {
    normalized.cv.experience = sortExperienceByMostRecent(normalized.cv.experience);
  }

  return normalized;
}

function validateCvBundle(bundle) {
  if (!bundle?.cv) {
    console.warn("[cv_bundle] Missing cv object.");
    return;
  }

  if (!Array.isArray(bundle.cv.experience)) {
    console.warn("[cv_bundle] cv.experience should be an array.");
  }

  if (!Array.isArray(bundle.portfolioItems)) {
    console.warn("[cv_bundle] portfolioItems should be an array.");
  }
}

export function getCvBundle({ locale = "en", variant = "default" } = {}) {
  const source = resolveSource(variant);
  const baseBundle = source.getBase({ locale });
  const allowedSkills = buildAllowedSkillSet(locale);
  let bundle = deepClone(baseBundle);

  bundle = applySelectors(bundle, source.selectors || {}, locale);
  bundle = deepMerge(bundle, source.overrides || {}, source.merge);
  bundle = normalizeCvBundle(bundle, source.normalize, allowedSkills);

  if (process.env.NODE_ENV !== "production" && source.validate) {
    validateCvBundle(bundle);
  }

  return bundle;
}

export function getCvVariantFromSearchParams(searchParams) {
  if (!searchParams) return "default";
  const variant = searchParams.variant || searchParams.cv || "default";
  return normalizeVariant(variant);
}

export function getCvVariantFromRequest(request) {
  const url = new URL(request.url);
  const variant = url.searchParams.get("variant") || url.searchParams.get("cv");
  return normalizeVariant(variant);
}
