import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GraphChart } from 'echarts/charts'
import { TitleComponent } from 'echarts/components'
import { TooltipComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { LineChart } from 'echarts/charts';

import Vue from 'vue'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  GaugeChart,
  LegendComponent,
  PieChart,
  GridComponent,
  BarChart,
  LineChart
])

Vue.use(VChart)