export class Meals {
    constructor(
        idCategory,
        strCategory,
        strCategoryDescription,
        strCategoryThumb,
    ) {
        this.idCategory = idCategory;
        this.strCategory = strCategory;
        this.strCategoryDescription = strCategoryDescription;
        this.strCategoryThumb = strCategoryThumb;
    }
    setData(data) {
        this.idCategory = data.idCategory;
        this.strCategory = data.strCategory;
        this.strCategoryDescription = data.strCategoryDescription;
        this.strCategoryThumb = data.strCategoryThumb;
    }

    getData() {
        return {
            idCategory: this.idCategory,
            strCategory: this.strCategory,
            strCategoryDescription: this.strCategoryDescription,
            strCategoryThumb: this.strCategoryThumb,
        };
    }
}