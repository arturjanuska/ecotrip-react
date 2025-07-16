import {
  CategoryInformation,
  CustomsCodeInformation,
} from './customsCodesTypes';

export function transformItems(
  flatItems: CustomsCodeInformation[]
): CategoryInformation[] {
  const categoryMap = new Map<string, CategoryInformation>();

  for (const item of flatItems) {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, {
        category: item.category,
        subCategories: [],
      });
    }

    const categoryInfo = categoryMap.get(item.category)!;

    let subCategory = categoryInfo.subCategories.find(
      (sc) => sc.name === item.subCategory
    );

    if (!subCategory) {
      subCategory = {
        name: item.subCategory,
        thirdLevels: [],
      };
      categoryInfo.subCategories.push(subCategory);
    }

    let thirdLevel = subCategory.thirdLevels.find(
      (tl) => tl.name === item.thirdLevel
    );

    if (!thirdLevel) {
      thirdLevel = {
        name: item.thirdLevel,
        items: [],
      };
      subCategory.thirdLevels.push(thirdLevel);
    }

    thirdLevel.items.push({
      description: item.description,
      customsCode: item.customsCode,
    });
  }

  return Array.from(categoryMap.values());
}
