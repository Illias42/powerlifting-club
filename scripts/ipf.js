const ipfCalcBtn = document.querySelector('.ipf-btn');
ipfCalcBtn.addEventListener('click', calc);

function dots_poly(a,b,c,d,e,x) {
    var x2=x*x,x3=x2*x,x4=x3*x;
    return 500.0 / (a*x4+b*x3+c*x2+d*x+e);
}

function dots_men(bw) {
    bw = Math.min(Math.max(bw, 40.0), 210.0);
    return dots_poly(-0.0000010930,0.0007391293,-0.1918759221,24.0900756,-307.75076,bw);
}

function dots_women(bw) {
    bw = Math.min(Math.max(bw, 40.0), 150.0);
    return dots_poly(-0.0000010706,0.0005158568,-0.1126655495,13.6175032,-57.96288,bw);
}

const PARAMETERS = {
    "M": {
      "Raw": {
        "SBD": [1199.72839, 1025.18162, 0.009210],
        "B": [320.98041, 281.40258, 0.01008]
      },
      "Single-ply": {
        "SBD": [1236.25115, 1449.21864, 0.01644],
        "B": [381.22073, 733.79378, 0.02398]
      }
    },
    "F": {
      "Raw": {
        "SBD": [610.32796, 1045.59282, 0.03048],
        "B": [142.40398, 442.52671, 0.04724]
      },
      "Single-ply": {
        "SBD": [758.63878, 949.31382, 0.02435],
        "B": [221.82209, 357.00377, 0.02937]
      }
    }
};

function getRadioValue(name) {
    let radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; ++i) {
      if (radios[i].checked) { return radios[i].value; }
    }
}

function calc() {
    const ipfResult = document.querySelector('.ipf-result');
    const ipfMessage = document.querySelector('.ipf-message');
    const ipfErr = document.querySelector('.ipf-err');
    const sex = getRadioValue("sex");
    const equipment = getRadioValue("equipment");
    const event = getRadioValue("event");
    const bw = document.getElementById("ipf-bodyweight").value;
    const total = document.getElementById("ipf-total").value;

    if(bw === '' || total === '' ||
        bw < 0 || total < 0) {

        ipfMessage.classList.add('hidden');
        ipfErr.classList.remove('hidden');
        ipfResult.classList.remove('hidden');

        return;
    }

    let dots = total * ((sex === "M") ? dots_men(bw) : dots_women(bw));

    let params = PARAMETERS[sex][equipment][event];
    let denom = params[0] - (params[1] * Math.exp(-1.0 * params[2] * bw))
    var glp = (denom === 0) ? 0 : Math.max(0, total * 100.0 / denom)
    if (isNaN(glp) || bw < 35) {
      glp = 0;
    }

    document.getElementById("display-glp").textContent = glp.toFixed(3);

    ipfErr.classList.add('hidden');
    ipfMessage.classList.remove('hidden');
    document.getElementById("display-glp").textContent = glp.toFixed(3);
    ipfResult.classList.remove('hidden');
}