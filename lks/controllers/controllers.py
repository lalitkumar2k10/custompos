# -*- coding: utf-8 -*-
from odoo import http

# class Lks(http.Controller):
#     @http.route('/lks/lks/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/lks/lks/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('lks.listing', {
#             'root': '/lks/lks',
#             'objects': http.request.env['lks.lks'].search([]),
#         })

#     @http.route('/lks/lks/objects/<model("lks.lks"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('lks.object', {
#             'object': obj
#         })