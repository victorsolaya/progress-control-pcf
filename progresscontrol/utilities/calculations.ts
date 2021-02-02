export interface Calculations {
	calculationLeft: number,
	calculationRight: number
}
    
export function returnCalculations(container: HTMLDivElement, number: number) : Calculations {
    const numb = (container.querySelector('.numb') as HTMLDivElement)
    const percentageStringify: string = number != null ? number?.toString() : "0";
    numb.innerHTML = `${percentageStringify}<span>%</span>`;
    const calculations: Calculations = doCalculations(number);
    return calculations;
}

export function doCalculations(int: number) : Calculations {
    let calcLeft = 0;
    let calcRight = 0;
    if(int < 100) {
        const calc = Math.round(int * 360 / 100);
        if(calc - 180 > 0) {
            calcLeft = 180;
            calcRight = calc - 180;
        } else {
            calcLeft = calc;
            calcRight = 0;
        }
    } else {
        calcLeft = 180;
        calcRight = 180;
    }
    var calculations: Calculations = { calculationLeft: calcLeft, calculationRight: calcRight};
    return calculations;
}

export function setCalculations(container: HTMLDivElement, calculations: Calculations): void {
    const progressElementLeft = container.querySelector('.circle .left .progress') as HTMLDivElement;
    const progressElementRight = container.querySelector('.circle .right .progress') as HTMLDivElement;
    progressElementLeft.style.transform = `rotate(${calculations.calculationLeft}deg)`;
    progressElementRight.style.transform = `rotate(${calculations.calculationRight}deg)`;
}

export function sum(firstOperator: number, secondOperator: number) {
    return firstOperator + secondOperator;
  }