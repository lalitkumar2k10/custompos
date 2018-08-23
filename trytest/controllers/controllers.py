# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import Response
import json

class Trytest(http.Controller):

    @http.route('/trytest/200', auth='public')
    def fn_200(self, **kw):
    	return Response("200",200)   


    @http.route('/trytest/202/', auth='public')
    def fn_202(self, **kw):  
    	d={}
    	d['a']="hello"
    	d['b']="asdfa"  	
    	return Response(json.dumps(d),202)   
