import * as cmmn from "./cmmn"
import * as njfunc from "./njfunc"
import {
    Njson,
    NJ_OR_UNDEFINED
} from "./njfunc"


const dflt_sdfs_show_connd = {
    't':'├── ',
    'v':'│   ',
    'l':'└── ',
    'ws':'    '
}


function dflt_calc_conn_map_func(conn:string):string {
    let rslt;
    if(conn==='t') {
        rslt = 'v'
    } else if(conn === 'v') {
        rslt = 'v'
    } else {
        rslt = 'ws'
    }
    return(rslt)
}

function conns2repr(
    conns:Array<string>,
    show_connd:any=dflt_sdfs_show_connd
):string {
    conns = conns.map(conn=>show_connd[conn])
    return(conns.join(''))
}

function clear$ui(njarr:Array<Njson>):Array<Njson> {
    njarr.forEach(
        nj=>{
            delete nj.$ui
        }
    )
    return(njarr)
}

function dflt_sdfs_calc_conns(njarr:Array<Njson>,nj:Njson):Njson {
    nj.$ui = {}
    if(njfunc.is_root(nj)){
        //跟节点没有前导ui 符号
        nj.$ui.conns = []
        nj.$ui.display = true
    } else {
        let parent = njfunc.get_parent(njarr,nj)
        //获取父节点的前导ui 符号序列数组
        let pconns:any;
        pconns = (parent as any).$ui.conns
        let conns = pconns.map(conn=>dflt_calc_conn_map_func(conn))
        let conj = njfunc.is_lstch(nj)
        if(conj) {
            conns.push('l')
        } else {
            conns.push('t')
        }
        nj.$ui.conns = conns
        nj.$ui.display = true
    }
    return(nj)
}

function dflt_sdfs_show_callback(sdfs:Array<Njson>,conns:Array<any>,i:number,k:string):string {
    let s = (conns+'['+i+']'+' : '+sdfs[i][k])
    return(s)
}


function get_sdfs_repr_arr(njarr:Array<Njson>,nj:Njson,k:string='_id',cb:any=dflt_sdfs_show_callback):Array<string> {
    let depth = njfunc.get_depth(njarr,nj)
    let sdfs = njfunc.get_deses(njarr,nj,true)
    sdfs = sdfs.map(nj=>dflt_sdfs_calc_conns(njarr,nj))
    let conns_array = sdfs.map(nj=>nj.$ui.conns)
    conns_array = conns_array.map(conns=>conns.slice(depth))
    conns_array = conns_array.map(conns=>conns2repr(conns,dflt_sdfs_show_connd))
    let arr = conns_array.map(
        (conns,i)=>cb(sdfs,conns,i,k)
    )
    arr = arr.filter((r,i)=>(sdfs[i].$ui.display === true))
    return(arr)
}

function show_sdfs0(njarr:Array<Njson>,k:string='_id',nj:NJ_OR_UNDEFINED,cb:any=dflt_sdfs_show_callback) {
    if(nj === undefined) {
        nj = <NJ_OR_UNDEFINED>njfunc.get_root(njarr)
    } else {
    }
    let sdfs = njfunc.get_sdfs(njarr,<Njson>nj)
    let sharr = get_sdfs_repr_arr(njarr,<Njson>nj,k,cb)
    sharr.forEach(r=>console.log(r))
}

function show_sdfs1(njarr:Array<Njson>,nj:NJ_OR_UNDEFINED,k:string='_id',cb:any=dflt_sdfs_show_callback) {
    if(nj === undefined) {
        nj = <NJ_OR_UNDEFINED>njfunc.get_root(njarr)
    } else {
    }
    let sdfs = njfunc.get_sdfs(njarr,<Njson>nj)
    let sharr = get_sdfs_repr_arr(njarr,<Njson>nj,k,cb)
    sharr.forEach(r=>console.log(r))
}

function show_sdfs_with_tag(njarr:Array<Njson>,nj:NJ_OR_UNDEFINED=undefined) {
    show_sdfs1(njarr,nj,'tag',dflt_sdfs_show_callback)
}

function show_sdfs_with_id(njarr:Array<Njson>,nj:NJ_OR_UNDEFINED=undefined) {
    show_sdfs1(njarr,nj,'_id',dflt_sdfs_show_callback)
}



export {
    get_sdfs_repr_arr,
    show_sdfs0,
    show_sdfs1,
    show_sdfs_with_id,
    show_sdfs_with_tag,
}


