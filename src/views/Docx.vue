<template>
  <div>
    <div>
      <button @click="exportDocx">导出docx</button>
    </div>
    <div>
      <img ref="keji" src="@/assets/images/keji.jpeg" style="width: 600px" />
    </div>
    <div ref="echart" style="width: 600px; height: 380px"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Document,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ShadingType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  convertInchesToTwip,
  UnderlineType,
  Header,
} from "docx";
import { saveAs } from "file-saver";
import * as echarts from "echarts";
import Keji from "@/assets/images/keji.jpeg";

@Component
export default class ViewDocx extends Vue {
  img_keji = "";
  img_radar = "";
  created() {
    this.getImgBase64(Keji).then((res: any) => {
      this.img_keji = res;
    });
    this.$nextTick(() => {
      const chartDom = this.$refs.echart as any;
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "Basic Radar Chart",
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
      this.img_radar = myChart.getDataURL({
        type: "png",
        backgroundColor: "white",
      });
    });
  }
  getImgBase64(url: string) {
    return new Promise((resolve) => {
      if (!url) {
        return resolve("");
      }
      const xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        }
      };

      xhr.onerror = function () {
        resolve("");
      };
      xhr.send();
    });
  }
  exportDocx() {
    const indentFirstLine = "        ";
    const doc = new Document({
      styles: {
        default: {
          heading1: {
            run: {
              size: 48,
              bold: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                after: 268,
              },
            },
          },
          heading3: {
            run: {
              size: 28,
              bold: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                after: 168,
              },
            },
          },
        },
        paragraphStyles: [
          {
            id: "normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            run: {
              size: 24,
              color: "333333",
            },
            paragraph: {
              spacing: {
                line: 268,
                after: 168,
              },
            },
          },
        ],
      },
      sections: [
        {
          headers: {
            default: new Header({
              children: [new Paragraph("七天汇")],
            }),
          },
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: this.img_keji,
                  transformation: {
                    width: 600,
                    height: 360,
                  },
                }),
              ],
            }),
            new Paragraph({
              text: "七天汇管理系统",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "姓名：",
                  bold: true,
                  size: 36,
                }),
                new TextRun({
                  text: "        张三        \n",
                  size: 36,
                  bold: true,
                  underline: {
                    type: UnderlineType.SINGLE,
                    color: "333333",
                  },
                }),
              ],
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_3,
              children: [
                new TextRun({
                  text: "1. 说明情况",
                  bold: true,
                  color: "333333",
                }),
              ],
              pageBreakBefore: true,
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: this.img_radar,
                  transformation: {
                    width: 600,
                    height: 360,
                  },
                }),
              ],
            }),
            new Paragraph({
              style: "normal",
              children: [
                new TextRun({
                  text:
                    indentFirstLine +
                    "新生代垃圾回收：V8 将新生代内存空间分为两个部分：From 空间和To 空间。新创建的对象首先被分配到From 空间，当From 空间满时，会触发垃圾回收过程。回收过程中，V8 首先进行标记操作，标记活跃的对象，然后将这些对象复制到To 空间，同时进行压缩等操作。最后，From 空间和To 空间的角色互换，完成垃圾回收。",
                }),
                new TextRun({
                  text:
                    indentFirstLine +
                    "老生代垃圾回收：老生代中的对象由于存活时间较长，垃圾回收的成本较高。V8 使用标记-清除（mark-sweep）和标记-压缩（mark-compact）两种算法进行老生代的垃圾回收。标记-清除算法首先进行标记操作，标记出活跃的对象，然后清除未标记的对象。标记-压缩算法在清除未标记的对象后，将存活的对象压缩到内存的一端，从而减少内存碎片化。",
                  break: 1,
                }),
                new TextRun({
                  text: indentFirstLine,
                  break: 1,
                }),
                new TextRun({
                  text: "增量标记：",
                  bold: true,
                }),
                new TextRun({
                  text: "为了降低垃圾回收对程序执行的影响，V8 引擎使用增量标记算法。增量标记允许垃圾回收过程与程序执行交替进行，每次执行一小部分的标记操作，减少了垃圾回收对程序的中断时间。",
                }),
              ],
            }),
          ],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "测试文档.docx");
    });
  }
}
</script>
<style lang="less" scoped></style>
