const tel = '+79651047054'



function f(tel) {

    let gg = tel.replace(/\D/g,'')
    return `+${gg.substr(0,1)} (${gg.substr(1,3)}) ${gg.substr(4,3)} ${gg.substr(7,2)} ${gg.substr(9,2)}`
}

console.log(f(tel));

function naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
    }

    return ax.length - bx.length;
}

let builds = [
    { id: 1, name: 'Build 91'},
    { id: 2, name: 'Build 32' },
    { id: 3, name: 'Build 13' },
    { id: 4, name: 'Build 24' },
    { id: 5, name: 'Build 5' },
    { id: 6, name: 'Build 56' }
]
