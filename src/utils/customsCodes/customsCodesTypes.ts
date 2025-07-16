export type CustomsCodeInformation = {
  category: string;
  subCategory: string;
  thirdLevel: string;
  description: string;
  customsCode: string;
};

export type CategoryInformation = {
  category: string;
  subCategories: {
    name: string;
    thirdLevels: {
      name: string;
      items: {
        description: string;
        customsCode: string;
      }[];
    }[];
  }[];
};
