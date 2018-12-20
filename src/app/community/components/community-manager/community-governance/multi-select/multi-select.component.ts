import { Component, Output, Input, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ups-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, OnChanges {
  @Input() list: any;
  @Input() active: boolean;
  @Output() selectedList = new EventEmitter<any>();
  @Input() updatedItems = new EventEmitter<any>();
  toggles = [false, true];
  toggles2 = [];
  selectedItems = [];
  data3: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // if ()
    this.setToggles();
  }

  setToggles() {
    this.toggles2 = [];
    for (const element of this.list) {
      const country = {
        value: true,
        districts: []
      };
      for (const distr of element.country.districts) {
        const district = {
          value: true,
          states: []
        };
        for (const state of distr.states) {
          const state2 = { value: true, slicks: [] };
          district.states.push(state2);
        }
        country.districts.push(district);
      }
      this.toggles2.push(country);
    }
    console.log('TOGGLES ', this.toggles2);
  }

  ngOnInit() {
    this.setToggles();
  }

  isChildNode(elmt) {
    return elmt.parentElement.nodeName === 'UL';
  }

  toggleChildNodes(evt, list) {
    if (list.className.indexOf('parent') > -1 && this.active) {
      for (const subList of list.childNodes[3].childNodes) {
        if (subList.nodeName === 'LI') {
          subList.childNodes[1].checked = evt.checked;
          this.toggleChildNodes(evt, subList);
        }
      }
    }
    this.selectElmts(list.childNodes[1].value);
  }

  selectedCheckbox($evt) {
    const parentList = ($evt.parentElement.nodeName === 'LI') ?
      $evt.parentElement :
      $evt.parentElement.parentElement.parentElement;
    if (this.active) {
      this.toggleChildNodes($evt, parentList);
    }
  }

  selectElmts(elmtVal) {
    const checked = [].slice.call(document.querySelectorAll('input:checked'));
    const slicks = [];
    const slickVals = [];
    for (const ll of checked) {
      if (ll.parentElement.className.indexOf('parent') === -1) {
        slicks.push(ll);
        slickVals.push(parseInt(ll.value));
      }

    }
    this.data3 = JSON.parse(JSON.stringify(this.list));
    if (slickVals.length > 0) {
      let removedCtry = 0;
      this.list.forEach((countryObj, c_index) => {
        let removedDist = 0;
        countryObj.country.districts.forEach((dstObj, d_index) => {
          let removedState = 0;
          dstObj.states.forEach((stateObj, s_index) => {
            let removed = 0;
            stateObj.slicks.forEach((slickObj, slick_index) => {
              if (!slickVals.includes(slickObj.id)) {
                if (this.data3[c_index] &&
                  this.data3[c_index].country.districts[(d_index - removedDist)].states[(s_index - removedState)]) {
                  this.data3[c_index].country.districts[(d_index - removedDist)]
                    .states[(s_index - removedState)].slicks.splice((slick_index - removed), 1);
                  removed++;
                }
              }
            });
            if (this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)].states[(s_index - removedState)] &&
              this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)].states[(s_index - removedState)].slicks &&
              this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)].states[(s_index - removedState)]
                .slicks.length === 0) {
              this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)].states.splice((s_index - removedState), 1);
              removedState++;
            }
          });
          if (this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)] &&
            this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)].states &&
            this.data3[(c_index - removedCtry)].country.districts[(d_index - removedDist)].states.length === 0) {

            this.data3[(c_index - removedCtry)].country.districts.splice((d_index - removedDist), 1);
            removedDist++;

            if (this.data3[(c_index - removedCtry)].country.districts.length === 0) {
              this.data3[(c_index - removedCtry)].country.districts = [];
              this.data3.splice((c_index - removedCtry), 1);
              removedCtry++;
            }
          }
        });
      });
    } else {
      this.data3 = [];
    }
    this.selectedList.emit(this.data3);
  }

  toggleTree(num, $evt, side, c_id, d_id, st_id) {
    if ($evt.target.nodeName !== 'INPUT') {
      if (side === 'first') {
        this.toggles[num] = !this.toggles[num];
      } else {
        if (d_id !== undefined) {
          if (st_id !== undefined) {
            this.toggles2[c_id].districts[d_id].states[st_id].value = !this.toggles2[c_id].districts[d_id].states[st_id].value;
          } else {
            this.toggles2[c_id].districts[d_id].value = !this.toggles2[c_id].districts[d_id].value;
          }
        } else {
          this.toggles2[c_id].value = !this.toggles2[c_id].value;
        }
        console.log('TOGGLES2 == ', this.toggles2);
      }
    }
  }

  filter($evt) {
    console.log($evt);
  }

}
