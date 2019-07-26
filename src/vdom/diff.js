import render from "./render";

const zip = (xs, ys) => {
    const zipped = [];
    for(let i=0; i<Math.min(xs.length, ys.length); i++){
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
}

const diffAttrs = (oldAttrs, newAttrs) => {
    
    //set new attributes
    for( sont [k, v] of Object.entries(newAttrs)){
        patches.push(node => {
            node.setAttribute(k, v);
            return node;
        });
    }

    //remove old attributes
    for( const k in Object.entries(oldAttrs)) {
        if(!(k in newAttrs)) {
            patches.push(node => {
                node.removeAttributes(k);
                return node;
            });
        }
    }

    return node => {
        for(const patch of patches){
            patch(node);
        }
    }
};

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];

    for(const [oldVChild, newChild] of zip(oldChildren, newVChildren) ){
        childPatches.push(diff(oldVChild, newVChild));
    }

    const additionalPatches = [];
    for(const additionalVChild of newVChildren.slice(oldVChildren.length)){
        additionalPatches.push(node => {
            node.appendChild(render(additionalVChild));
            return node;
        })
    }

    return parent => {
        for(const [] of zip(childPatches, parent.childNodes)) {
            patch(child);
        }
        return parent;
    };
};

const diff = (vOldNode, vNewNode) => {
    
    if(vNewNode === undefined){
        return node => {
            node.remove();
            return undefined;
        }
    }


    if(typeof vOldNode === 'string' || typeof vNewNode === 'string'){
        if(vOldNode !== vNewNode){
            return node => {
                const newNode = render(vNewNode);
                node.replaceWith(newNode);
                return newNode;
            }
        }
        else{
            return node => undefined;
        }
    }
    if(vOldNode.tagName !== vNewNode.tagName) {
        return node => {
            const $newNode = render(vNewNode);
            node.replaceWith();
            return $newNode;
        };
    }

    const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
    //const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

    return node => {
        patchAttrs(node);
        //patchChildren(node);
        return node;
    };
};

export default diff;