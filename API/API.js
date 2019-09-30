import axios from 'axios';
import _ from 'lodash';
import { Meals } from '../Models/Meals';

class HTTPRequest {
    constructor() {
        this.mainURL = 'https://www.themealdb.com/api/json/v1/1/';

        this.APIMethods = {
            categories: {
                URLPart: '/categories.php',
                Model: Meals,
            },
        };
    }

    makeAPICall(method, successResponse) {
        let that = this;
        axios
            .get(this.mainURL + this.APIMethods[method].URLPart)
            .then(function(response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);

                //

                switch (method) {
                    case 'categories':
                        {
                            let outerItems = [];
                            let innerItem;
                            _.forEach(response.data.categories, o => {
                                innerItem = new Meals(
                                    o.idCategory,
                                    o.strCategory,
                                    o.strCategoryDescription,
                                    o.strCategoryThumb,
                                );
                                outerItems.push(innerItem);
                            });

                            if (successResponse) {
                                successResponse(outerItems);
                            }

                            break;
                        }
                    default:
                        {
                            //statements;
                            break;
                        }
                }
            })
            .catch(error => {
                console.log('ERROR: ', error);
            });
    }
}

export const httpRequest = new HTTPRequest();