const $lastLi = $('.siteList').find('li.last')
const x = localStorage.getItem('x')
/* console.log(typeof x)
console.log(x) */
const removeX = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('cn.', '')
        .replace(/\/.*/, '')
}
const xObject = JSON.parse(x); //转换成对象；

const hashTable = xObject || [];
const hash2 = [{
    logo: 'V',
    url: 'https://cn.vuejs.org/'
},
{
    logo: 'R',
    url: 'https://reactjs.org/'
},
{
    logo: 'N',
    url: 'https://nodejs.org/en/'
},
{
    logo: 'N',
    url: 'https://developer.mozilla.org/zh-CN/'
}
];


//构造函数遍历哈希表；哈希表数据结构为[{logo:'logo',url:'url},{}....]
const render = () => {
    $('.siteList').find('li.newSite').remove()
    hashTable.forEach((node, index) => {
        const $li = $(`
        <li class="newSite">
        <div class="site">
            <svg class="removeSite" class="icon"> 
            <use xlink:href="#icon-Remove"></use>
            </svg>
            <div class="logo" >${removeX(node.url)[0]}</div>
            <span>${removeX(node.url)}</span>
        </div>
        </li>`).insertBefore($lastLi)

        $li.on("click", () => {
            window.open(node.url)
        })

        $li.on("click", '.removeSite', (e) => {
            e.stopPropagation() //阻止冒泡

            hashTable.splice(index, 1)
            $('.siteList').find('li.newSite').remove()
            string = JSON.stringify(hashTable) //转换成字符串
            localStorage.setItem('x', string) //大小写- -！
            render()

        })
    })
};

render(); //执行遍历函数，渲染哈希表

$("#newSite").on("click", null, () => {
    let url = prompt("请输入网址")
    while(url==0){
       url = prompt("未检测到输入的网址，请重试")}
       //自动补全
    if (url.indexOf('http') == -1) {
        if (url.indexOf('www') == -1) {
            logo = removeX(url)[0]
            url = `https://www.${url}`
        } else {
            logo = removeX(url)[0]
            url = `https://${url}`
        }
        hashTable.push({
            logo: logo,
            url: url
        })
    } else {
        if (url.indexOf('www') == -1) {
            logo = removeX(node.url)[0]
            url = `www.${url}`
        } else {
            logo = removeX(node.url)[0]
            url = `https://${url}`
        }
        hashTable.push({
            logo: logo,
            url: url
        })
    }
    //删除之前的，重新渲染；
    render();
    string = JSON.stringify(hashTable) //转换成字符串
    localStorage.setItem('x', string) //大小写- -！
})

$(document).on('keypress', (e) => {
    const {key} = e
    console.log(e.key)
  
    for (let i = 0; i < hashTable.length; i++) {
        if (hashTable[i].logo.toLowerCase() === key) {
            window.open(hashTable[i].url)
        } }

        for (let i = 0; i < hash2.length; i++) {
        if (hash2[i].logo.toLowerCase() === key) {
            window.open(hash2[i].url)
            console.log(i)
        }

    }}
)