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
            this._super(parent,options);
        },
        renderElement: function() {
            var el_str  = QWeb.render(this.template, {widget: this});
            var el_node = document.createElement('div');
                el_node.innerHTML = el_str;
                el_node = el_node.childNodes[1];

            if(this.el && this.el.parentNode){
                this.el.parentNode.replaceChild(el_node,this.el);
            }
            this.el = el_node;
            // console.log('customAllproduct in render',customAllproduct[0].qty_available); 
            var list_container = el_node.querySelector('.product-list');
            
            
            console.log('product_list out render',this.product_list);
            console.log('customAllproduct out render',customAllproduct);
            for(var i = 0, len = this.product_list.length; i < len; i++){
                // console.log(this.customAllproduct[0].qty_available);

                // console.log('product_list in render',this.product_list[0].qty_available=customAllproduct[0].qty_available); 
                
                for(var j=0;j<customAllproduct.length;j++){
                    if(this.product_list[i].id==customAllproduct[j].id){
                        this.product_list[i].qty_available=customAllproduct[j].qty_available;
                        this.product_list[i].type=customAllproduct[j].type;
                    
                    }
                }
                console.log('product_list in render',this.product_list[i].qty_available);
                // console.log('customAllproduct in for render',customAllproduct[0].qty_available); 
            
                var product_node = this.render_product(this.product_list[i]);
                // console.log(this.product_list);
                if(this.product_list[i].qty_available>0){
                    product_node.addEventListener('click',this.click_product_handler);
                }
                
                list_container.appendChild(product_node);
            }
        },
    });
    // model.load_fields('product.product',['qty_available']);


});
    
    