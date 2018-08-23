odoo.define('testing.test', function (require) {
    "use strict";
    var screens = require('point_of_sale.screens');
    var PosBaseWidget = require('point_of_sale.BaseWidget');
    var core = require('web.core');
    var gui = require('point_of_sale.gui');
    var models = require('point_of_sale.models');
    var rpc = require('web.rpc');

    var QWeb = core.qweb;
    var _t = core._t;
    // var _super_orderline = models.Orderline.prototype;


    // models.load_models({
    //     model: 'table.chair',
    //     fields: ['name'],
    //     loaded: function(self,chair){
    //         console.log("trying to load chair");
    //         console.log(chair);
    //         // for(var i=0;i<chair.length;i++){
    //         //     // self.add_chair()
    //         // }
    //     }
    // });

    // models.load_models({
    //     model: 'table.chair',
    //     fields: ['name'],
    //     loaded: function(self,chair){
    //         self.chair = chair;

    //     },
    // });
    // i start
    models.load_models({
        model: 'product.product',
        fields: ['qty_available','type','display_name'],
        loaded: function(self,allproduct){
            self.allproduct = allproduct;

        },
    });
    // var customChair;
    // i
    var customAllproduct;
    var newproduct = screens.ProductListWidget.include({
        init:function(parent, options){
            customAllproduct=parent.pos.allproduct;
            // console.log('customAllproduct',customAllproduct);
            var self = this;
            this._super(parent,options);
            // console.log('screen.js options',options);
            // this.click_product_handler = function(){
            //     console.log('rewritten and should do noyhing');
            // };
            this.click_product_handler = function(){
                var product = self.pos.db.get_product_by_id(this.dataset.productId);
                    
                if(product.qty_available<=0 && product.type=='product'){
                    // console.log('this.click_product_handler called',product);
                    alert("out of stock");

                }
                else{
                    options.click_product_action(product);
                    product.qty_available=product.qty_available-1;
                    // jquery or js to real time update values
                    console.log(this.$('stock-tag'));
                }
            };
        },
        renderElement: function() {
            var el_str  = QWeb.render(this.template, {widget: this});
            var el_node = document.createElement('div');
                el_node.innerHTML = el_str;
                el_node = el_node.childNodes[1];

            if(this.el && this.el.parentNode){
                this.el.parentNode.replaceChild(el_node,this.el);
            }

            // console.log('helo',this.$('div.chair-list'));
            this.el = el_node;
            // console.log('customAllproduct in render',customAllproduct[0].qty_available); 
            var list_container = el_node.querySelector('.product-list');
            
            //print random variable

            // console.log('last printed',Math.random());
            // console.log('gap');

            // console.log('product_list out render',this.product_list);
            // console.log('customAllproduct out render',customAllproduct);
            // console.log('already there',this.product_list[0]);
            // console.log('already there',this.product_list[0].qty_available);
            // if(this.product_list[0].qty_available==undefined){
            //     this.product_list[0].qty_available=1;
            //     console.log('if already there',this.product_list[0].qty_available);
            // }
            // else{
            //     this.product_list[0].qty_available=2;
            //     console.log('else already there',this.product_list[0].qty_available);
            // }
            for(var i = 0, len = this.product_list.length; i < len; i++){
                // console.log(this.customAllproduct[0].qty_available);

                // console.log('product_list in render',this.product_list[0].qty_available=customAllproduct[0].qty_available); 
                // // console.log('already there',this.product_list[i].qty_available);
                // adding quantity commented
                for(var j=0;j<customAllproduct.length;j++){
                    if(this.product_list[i].id==customAllproduct[j].id){
                        if(this.product_list[i].qty_available==undefined){
                            this.product_list[i].qty_available=customAllproduct[j].qty_available;
                            this.product_list[i].type=customAllproduct[j].type;
                        }
                        else{

                        }
                        
                    }
                }

                // console.log('product_list in render',this.product_list[i].qty_available);
                // console.log('customAllproduct in for render',customAllproduct[0].qty_available); 
            
                var product_node = this.render_product(this.product_list[i]);
                console.log('product_node',product_node);
                // console.log(this.product_list);
                
                //adding validate part hence commented 

                // if(!(this.product_list[i].qty_available<=0 && this.product_list[i].type=='product')){
                //     product_node.addEventListener('click',this.click_product_handler);
                // }
                product_node.addEventListener('click',this.click_product_handler);
                list_container.appendChild(product_node);
            }
        },
    });
    // model.load_fields('product.product',['qty_available']);


});
    
    