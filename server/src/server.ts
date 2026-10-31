import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {ListToolsRequestSchema,CallToolRequestSchema} from '@modelcontextprotocol/sdk/types.js';
import {reserveTools,callReserveTool} from './reserve-tools.js';
import {attachWidgets} from './widget-layer.js';
export function createServer(){const server=new Server({name:'b2b-customer-success-candidate',version:'1.2.6'},{capabilities:{tools:{}}});attachWidgets(server);server.setRequestHandler(ListToolsRequestSchema,async()=>({tools:reserveTools()}));server.setRequestHandler(CallToolRequestSchema,async r=>callReserveTool(r.params.name,r.params.arguments));return server;}
