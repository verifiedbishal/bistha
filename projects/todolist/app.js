//This is a todoController module
var todoController = (function(){

    var todo = function(id,description){
        this.id = id;
        this.description = description;
    };

    var data = {
        allItems : {
            val : []
        }
    };

    return {
        addInput : function(des){
            var ID,newItem;

            if(data.allItems['val'].length > 0){
                ID = data.allItems['val'][data.allItems['val'].length - 1].id + 1 ;
            } else{
                ID = 0;
            }

            newItem = new todo(ID,des);

            //Push the data to the array
            data.allItems['val'].push(newItem);

            return newItem;
        },

        deleteItem : function(id){
            var ids,index;

            ids = data.allItems['val'].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems['val'].splice(index,1);
            }


        },

        testing : function(){
            console.log(data);
        }
    }

})();

//This is a UIController module
var UIController = (function(){

    return{
        getInput : function(){
            return{
                description : document.querySelector('.add__description').value //This will return the value of the field
            }
        },
        addListItem : function(obj){
            var html,newHtml;

            html = '<div class="item clearfix" id="val-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);

            document.querySelector('.todo__list').insertAdjacentHTML('beforeend',newHtml);


        },
        deleteListItem : function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);//This looks confusing but this is how it works

        },

        clearFields : function(){
            var fields,fieldsArr;

            fields = document.querySelectorAll('.add__description');

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current){
                current.value = "";
            });

            fieldsArr[0].focus();

        }




    }

})();

//This is a contoller module
var controller = (function(todoCtrl,UICtrl){

    var setupEventListener = function(){

        //If the button is clicked
        document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

        //If enter is clicked
        document.addEventListener('keypress',function(event){
            if(event.keycode === 13 || event.which === 13){ //13 is the keycode for enter button
                ctrlAddItem();
            }
        });

        document.querySelector('.container').addEventListener('click',ctrlDeleteItem);
        



    };

    var ctrlAddItem = function(){
        var input,newItem;

        //1. Receive the input from the UI
        input = UICtrl.getInput();
        

        //2. Return the input value to the todoController
        newItem = todoCtrl.addInput(input.description); //this contains the id and description returned by the todo controller

        //3. Add the data in the UI
        UICtrl.addListItem(newItem);

        //Clearing the field box after the item is added to the UI
        UICtrl.clearFields();

    };

    var ctrlDeleteItem = function(event){
        var itemID,splitID,ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //Now delete the item from the data structure
            todoCtrl.deleteItem(ID);

            //Delete the item from the UI
            UICtrl.deleteListItem(itemID);



        }



    }


    return{
        init : function(){
            console.log("App has successfully started.");
            setupEventListener();
        }
    }

})(todoController,UIController);

controller.init();