import './css/style.scss';
import {loadTargets,loadBreadCrumb} from './modules';

window.addEventListener('load',()=>{
})
document.addEventListener('DOMContentLoaded',()=>{
    loadTargets()
    loadBreadCrumb()
})

window.addEventListener('hashchange',()=>{
    loadTargets()
})