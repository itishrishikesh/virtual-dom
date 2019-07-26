import createElement from "./vdom/createElement";
import render from "./vdom/render";
import mount from "./vdom/mount";
import diff from "./vdom/diff";

const createVApp = (count) => createElement('div', {
        attrs: {
            id: 'app',
            dataCount: count
        },
        children: [
            'The current count is: ',
            String(count),
            ...Array.from({ length: count }, () => createElement('img', {
                attrs: {
                    src: "https://media1.tenor.com/images/da68635b2cd0b43a1e1553bc6f4c8496/tenor.gif"
                },
                children: []
            }))
        ],
    }
);

let count = 0;
let vApp = createVApp(count);
const app = render(vApp);


let root = mount(app, document.getElementById("app"));

setInterval(() => {
    const n = Math.floor(Math.random() * 10);
    const vNewApp = createVApp(n);
    const patch = diff(vApp, vNewApp);
  
    // we might replace the whole $rootEl,
    // so we want the patch will return the new $rootEl
    root = patch(root);
  
    vApp = vNewApp;
}, 1000)

console.log(app);