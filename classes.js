class Asset{
	constructor(quantity,type,value,isunitvalue=true){
		this.quantity=quantity;
		this.type=type;
		this.value=value;
		this.isunitvalue=isunitvalue;
	}
	get total(){
		if(!this.isunitvalue) return this.value;
		console.log("AT",this.quantity,this.value,this.quantity*this.value);
		return this.quantity * this.value;
	}
	render(){
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		td1.innerText=this.quantity+"x"
		td2.innerText=this.type;
		td3.innerText="~$"+this.value+(this.isunitvalue?"ea":" total");
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		return tr;
	}
}

class Pledger{
	constructor(name,assets=[]){
		this.name=name;
		this.assets=assets;
	}
	get total(){
		let total = 0.00;
		for(let asset of this.assets){
			console.log(" PTA",asset,asset.total);
			total += asset.total;
		}
		return total;
	}

	renderAssetTable(){
		let table = document.createElement('table')
		for(let asset of this.assets){
			let tr = asset.render();
			table.appendChild(tr);
		}
		return table;
	}
	renderAssetAccordion(){
		let table = this.renderAssetTable();

		let desc = document.createElement('details');
		let summ = document.createElement('summary');
		summ.innerText = "~$"+this.total;
		desc.appendChild(summ);
		desc.appendChild(table);
		return desc;
	}
	render(){
		let card = document.createElement('pledge-card');
		let name = document.createElement('pledge-name');
		let asst = this.renderAssetAccordion();
		name.innerText = this.name;
		card.appendChild(name);
		card.appendChild(asst);
		return card;
	}
}


class HEFPage{
	constructor(pledgers=[]){
		this.pledgers=pledgers;
		this.init();
	}
	get total(){
		let total = 0.00;
		for(let pledger of this.pledgers){
			total += pledger.total;
		}
		return total;
	}
	init(){
		 document.addEventListener("DOMContentLoaded", ()=> {
      			this.render();
  		});
	}
	render(){
		let list = document.getElementById('pledgers');
		console.log(list);
		for(let pledger of this.pledgers){
			let pelem = pledger.render();
			console.log(pelem);
			list.appendChild( pelem );
		}
		
		let totelem = document.getElementById('total');
		totelem.innerText = this.total;
	}

}