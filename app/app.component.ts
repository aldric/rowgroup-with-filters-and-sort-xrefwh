import { Component, ViewChild } from "@angular/core";
import { Table } from "primeng/components/table/table";
import { SortEvent } from "primeng/components/common/api";
import { TreeNode, SelectItem } from "primeng/api";
import {MenuItem} from 'primeng/api';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  tl: any[];
  casinos: any[];
  topNodes: TreeNode[];
  flatsCasinos: any[];
  cols: any[];

  languages: MenuItem[];
  selectedType: any = "casino";
  selectedBrand: any = "casino.com";

  expandedRows: number[];

  rowGroupMetadata = {};

  @ViewChild("table")
  table: Table;

  types: SelectItem[];

  constructor() {
    this.types = [
      { label: "Casino", value: "casino" },
      { label: "Sport", value: "sport" },
      { label: "Poker", value: "poker" },
      { label: "Other", value: "other" }
    ];
  }

  ngOnInit() {
    this.languages = [
      {
        label: "Languages",
        items: [
          { label: "English" },
          { label: "French" },
          { label: "German" },
          { label: "Spanish" },
          { label: "Finnish" },
          { label: "Norwegian" }
        ]
      }
    ];
    this.tl = [
      {
        campaign: "ZZ-en-Default",
        casino: "casino.com",
        cloakedLink: "/go/casino.com.html",
        ip: "all",
        website: "Default",
        product: "sport",
        language: "en",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "CA-en-Default",
        casino: "casino.com",
        cloakedLink: "/go/casino.com.html",
        ip: "CA",
        product: "casino",
        website: "Default",
        language: "en",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "CA-en-MS",
        casino: "casino.com",
        cloakedLink: "/go/casino.com.html",
        ip: "CA",
        product: "casino",
        website: "MS",
        language: "en",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3305&pid=2"
      },
      {
        campaign: "CA-en-CBI",
        casino: "casino.com",
        cloakedLink: "/go/casino.com.html",
        ip: "CA",
        product: "casino",
        website: "casinobonusindex.com",
        language: "en",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3305&pid=2"
      },
      {
        campaign: "ZZ-FR-Default",
        casino: "casino.fr",
        cloakedLink: "/go/casino.fr.html",
        ip: "all",
        product: "casino",
        website: "Default",
        language: "fr",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "FR-FR-Default",
        casino: "casino.fr",
        cloakedLink: "/go/casino.fr.html",
        ip: "FR",
        product: "casino",
        website: "Default",
        language: "fr",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "FR-FR-COS",
        casino: "casino.fr",
        cloakedLink: "/go/casino.fr.html",
        ip: "FR",
        product: "casino",
        website: "cos",
        language: "fr",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "CA-FR-Default",
        casino: "casino.fr",
        cloakedLink: "/go/casino.fr.html",
        product: "casino",
        ip: "CA",
        website: "cof",
        language: "fr",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "CA-FR-COF",
        casino: "casino.fr",
        cloakedLink: "/go/casino.fr.html",
        ip: "CA",
        product: "casino",
        website: "Default",
        language: "fr",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "ZZ-EN-Default",
        casino: "casino.io",
        cloakedLink: "/go/casino.io.html",
        ip: "all",
        product: "casino",
        website: "Default",
        language: "en",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3304&pid=2"
      },
      {
        campaign: "ZZ-FI-Default",
        casino: "casino.fi",
        cloakedLink: "/go/casino.fi.html",
        ip: "all",
        product: "bingo",
        website: "casino-online.fi",
        language: "fi",
        trackingLink:
          "https://frankfred.epic.partners/tracking.php?tracking_code&aid=100041&mid=868&sid=3305&pid=0"
      }
    ];

    this.casinos = ["casino.com", "casino.fr", "casino.io", "casino.fi"].map(
      v => ({ label: v, value: v })
    );

    this.topNodes = this.tl
      .filter(cas => cas.ip === "all" && cas.website === "Default")
      .map(v => ({
        data: { ...v, label: v.casino },
        children: [],
        label: v.casino
      }));

    this.topNodes.forEach(node => {
      node.children = this.tl
        .filter(
          cas =>
            cas.casino === node.data.casino &&
            cas.ip !== "all" &&
            cas.website === "Default"
        )
        .map(v => ({ data: { ...v, label: v.ip }, children: [], label: v.ip }));

      node.children.forEach(siteNode => {
        siteNode.children = this.tl
          .filter(
            cas =>
              cas.casino === node.data.casino &&
              cas.ip !== "all" &&
              cas.website !== "Default"
          )
          .map(v => ({
            data: { ...v, label: v.website },
            children: [],
            label: v.website
          }));
      });
    });

    console.log(this.topNodes);

    this.updateRowGroupMetaData(this.tl);
  }
  customSort(event: SortEvent) {
    this.sort(event.data, "casino", event.order);
    this.sort(event.data, event.field, event.order);
    this.updateRowGroupMetaData(event.data);
  }

  onFilter(event) {
    this.updateRowGroupMetaData(event.filteredValue);
  }

  updateRowGroupMetaData(data) {
    this.rowGroupMetadata = {};
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let rowData = data[i];
        let casino = rowData.casino;
        if (i == 0) {
          this.rowGroupMetadata[casino] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.tl[i - 1];
          let previousRowGroup = previousRowData.casino;
          if (casino === previousRowGroup) this.rowGroupMetadata[casino].size++;
          else this.rowGroupMetadata[casino] = { index: i, size: 1 };
        }
      }
    }
  }

  sort(array, field, order) {
    array.sort((data1, data2) => {
      const value1 = data1[field];
      const value2 = data2[field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === "string" && typeof value2 === "string") {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return order * result;
    });
  }
}
