import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { returnCalculations, setCalculations, } from './utilities/calculations'

export class progresscontrol implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	container: HTMLDivElement;
	number: number;
	isControlDisabled: boolean;
	isControlVisible: boolean;
	widthProp: number;
	cssPath: string | null;
	setMaximumValue: string;
	setMaximumValueBool: boolean;
	fieldid: string | undefined;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this.fieldid = context.parameters.field.attributes?.LogicalName;
		this.setMaximumValue = context.parameters.is100MaximumValue.raw || "True";
		this.setMaximumValueBool = this.setMaximumValue.toLowerCase() == "true" ? true : false;
		this.container = container;

		this.notifyOutputChanged = notifyOutputChanged;
		this.cssPath = null//context.parameters.configCSSPath.raw || null;
		if(this.cssPath != null) {
			const cssProgressControlLink = this.container.querySelector("link[href*='css/progresscontrol']")
			cssProgressControlLink?.setAttribute("href", this.cssPath)
		}
		let timeout: any = 0;
		this.initializeHTML();
		const numb = (this.container.querySelector('.numb') as HTMLDivElement)
		numb.addEventListener("input", (eventTarget: any) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				let currentValue = eventTarget.target.innerText.replace(/[^0-9]/g, "");
				currentValue = currentValue != "" && currentValue != null ? currentValue : 0;
				let value = currentValue;
				if(this.setMaximumValueBool == true) {
					value = currentValue < 100 ? currentValue : 100;
				}
				const prevValue = this.number;
				this.number = parseInt(value as string);
				const calculations = returnCalculations(this.container, this.number);
				setCalculations(this.container, calculations);
				if(prevValue !== value) {
					this.notifyOutputChanged();
				}
			}, 500);
		}, false);
	}
	notifyOutputChanged() {
		throw new Error("Method not implemented.");
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.isControlDisabled = context.mode.isControlDisabled;
		this.isControlVisible = context.mode.isVisible;
		const circularContainer = this.container.querySelector('.containerCircularVSPCF') as HTMLDivElement;
		const numb = this.container.querySelector('.numb') as HTMLDivElement;
		if(this.isControlVisible == false) {
			circularContainer.style.display = "none";
		} 
		else {
			circularContainer.style.display = "block";

			if (this.isControlDisabled == true) {
				numb.setAttribute("contenteditable", "false");
			} else {
				numb.setAttribute("contenteditable", "true");
			}
			this.widthProp = context.mode.allocatedWidth;
			// Add code to update control view
			this.number = context.parameters.field.raw || 0;
			if(this.setMaximumValueBool == true) {
				const currentValue = parseInt(numb.innerText.replace(/[^0-9]/g, ""));

				if(this.number !== currentValue) {
					this.number = this.number > 100 ? 100 : this.number;
					this.notifyOutputChanged();
				}
			}
			const calculations = returnCalculations(this.container, this.number);
			setCalculations(this.container, calculations);
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			field: this.number
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

	private initializeHTML(): void {

		var containerCircular: HTMLDivElement = document.createElement("div");
		containerCircular.classList.add("containerCircularVSPCF");

		var circular: HTMLDivElement = document.createElement("div");
		circular.classList.add("circular");

		var inner : HTMLDivElement= document.createElement("div");
		inner.classList.add("inner");

		var outer: HTMLDivElement = document.createElement("div");
		outer.classList.add("outer");

		var numb : HTMLDivElement = document.createElement("div");
		numb.classList.add("numb");

		var spanNumb: HTMLSpanElement = document.createElement("span");
		spanNumb.textContent = "%";

		var circle: HTMLDivElement = document.createElement("div");
		circle.classList.add("circle");

		var dot: HTMLDivElement = document.createElement("div");
		dot.classList.add("dot");

		var span: HTMLSpanElement = document.createElement("span");

		var barleft: HTMLDivElement = document.createElement("div");
		barleft.classList.add("bar");
		barleft.classList.add("left");

		var barright: HTMLDivElement = document.createElement("div");
		barright.classList.add("bar");
		barright.classList.add("right");

		var progress: HTMLDivElement = document.createElement("div");
		progress.classList.add("progress");
		progress.style.transform = "rotate(0deg)"

		var progressLeft: HTMLDivElement = document.createElement("div");
		progressLeft.classList.add("progress");
		progressLeft.style.transform = "rotate(0deg)"
		
		circular.appendChild(inner);
		circular.appendChild(outer);
		numb.appendChild(spanNumb);
		circular.appendChild(numb);
		circular.appendChild(circle);
		circle.appendChild(dot);
		dot.appendChild(span);
		circle.appendChild(barleft);
		circle.appendChild(barright);
		barleft.appendChild(progressLeft);
		barright.appendChild(progress);
		containerCircular.appendChild(circular);

		this.container.appendChild(containerCircular);
	}

	
}