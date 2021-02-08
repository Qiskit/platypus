<template>
  <div class="what-is-qv-chart what-is-qv-chart_state" :class="`what-is-qv-chart_state-${state}`">
    <div class="what-is-qv-chart__axis">
      <LabeledArrow class="what-is-qv-chart__axis__arrow what-is-qv-chart__axis__arrow_vertical" :label="`Qubits`" />
      <LabeledArrow class="what-is-qv-chart__axis__arrow what-is-qv-chart__axis__arrow_horizontal" :label="`Reduced Error`" />
    </div>
    <div class="what-is-qv-chart__content">
      <SketchSquare
        v-for="(n, i) in 4"
        :key="n"
        :class="`what-is-qv-chart__square what-is-qv-chart__square_qv${Math.pow(2, 5 - i)}`"
        :width="450 - i * 85"
        :height="450 - i * 85"
        :hide-left="true"
        :hide-bottom="true"
        :dashed="true"
      >
        <div class="what-is-qv-chart__square__content">
          <span class="what-is-qv-chart__square__text">QV {{ Math.pow(2, 5 - i) }}</span>
          <LayersCircuit
            :lines="5 - i"
            :layers="5 - i"
            :gradient-color="gradientColors[i]"
            :enable-inspection="inspectable(i)"
            :gates-config="gatesConfig"
          />
          <span class="what-is-qv-chart__square__tooltip">{{ tooltip[4 - n] }}</span>
        </div>
      </SketchSquare>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component'
import SketchSquare from '../Sketch/SketchSquare.vue'
import LabeledArrow from './LabeledArrow.vue'
import LayersCircuit from './LayersCircuit.vue'

class Props {
  state = prop<Number>({ default: 0 })
  tooltip = prop<String[]>({ required: true })
}

@Options({
  components: {
    SketchSquare,
    LabeledArrow,
    LayersCircuit
  }
})

export default class WhatIsQuantumChart extends Vue.with(Props) {
  gradientColors = [
    ['#78A9FF', '#8A3FFC'],
    ['#95AAFE', '#A165FD'],
    ['#B3AEFE', '#B98CFD'],
    ['#CEBDFE', '#D0B2FE']
  ]

  gatesConfig = [
    [
      { q1: 0, q2: 1 },
      { q1: 2, q2: 3 }
    ],
    [
      { q1: 0, q2: 3 },
      { q1: 3, q2: 4 }
    ],
    [
      { q1: 0, q2: 1 },
      { q1: 3, q2: 4 }
    ],
    [
      { q1: 0, q2: 1 },
      { q1: 2, q2: 4 }
    ],
    [
      { q1: 0, q2: 4 },
      { q1: 3, q2: 4 }
    ]
  ]

  inspectable (idx: number) {
    return idx === 0 && this.state === 4
  }

  uid = Math.random().toString().replace('.', '')
}
</script>
<style scoped lang="scss">

.what-is-qv-chart {
  position: relative;
  margin: 0 auto;
  width: 550px;
  height: 510px;

  &__axis {
    width: 550px;
    height: 510px;
    pointer-events: none;

    &__arrow {
      position: absolute;
      width: 510px;
      bottom: 0;
      left: 0;
      padding-left: 70px;

      &_vertical {
        transform: translate(-50%, 0) translate(15px, 15px) rotate(270deg) translate(50%, 0);
      }
    }
  }

  &__content {
    position: absolute;
    bottom: 45px;
    left: 45px;

    width: 505px;
    height: 465px;
  }

  &__square {
    position: absolute;
    bottom: 0px;
    left: 0px;

    &__content {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #F2F4F8;
    }

    &__text {
      position: absolute;
      top: 0px;
      right: 5px;

      display: block;
      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 16px;
      text-align: right;
      opacity: 0;
    }

    &__tooltip {
      display: none;
      position: absolute;
      right: -10px;
      top: -130px;
      width: 200px;
      height: 120px;

      background: #343A3F;
      border-radius: 2px;

      padding: 10px;
      color: #FFFFFF;

      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -8px;
        right: 20px;

        border-left: 7px solid transparent;
        border-right: 7px solid transparent;

        border-top: 9px solid #343A3F;
      }
    }

    &__content:hover :deep() &__tooltip {
      display: block;
    }
    &__content :deep() .layers-circuit__circuit-line__ket0 {
      opacity: 0;
    }
  }

//////////////////
/// ANIMATIONS ///
//////////////////

  $disabled-opacity: 0.3;
  $root: &;

  &_state {

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes arrowInAnimation {
      from { margin-right: 500px; }
      to { margin-right: 0; }
    }
    @keyframes crescentQVAnimation {
      from { transform: translate(-50%, 50%) scale(0.4) translate(50%, -50%); }
      to { transform: translate(-50%, 50%) scale(1) translate(50%, -50%); }
    }

    &-1 {
      #{$root} {
        &__content {
          transition: opacity 0.2s ease-out;
          opacity: 0;
        }

        &__axis__arrow_horizontal {
          transition: opacity 0.2s ease-out;
          opacity: 0;
        }

        &__axis__arrow_vertical :deep() .labeled-arrow {
          &__arrow {
            margin-right: 500px;
            animation: 1s ease-out 1s arrowInAnimation;
            animation-fill-mode: forwards;
          }
          &__label {
            opacity: 0;
            animation: 0.5s ease-out 1s fadeIn;
            animation-fill-mode: forwards;
          }
        }
      }
    }
    &-2 {
      #{$root} {
        &__content {
          transition: opacity 0.2s ease-out;
          opacity: 0;
        }

        &__axis__arrow_horizontal :deep() .labeled-arrow {
          &__arrow {
            margin-right: 500px;
            animation: 1s ease-out 0s arrowInAnimation;
            animation-fill-mode: forwards;
          }
          &__label {
            opacity: 0;
            animation: 0.5s ease-out 0s fadeIn;
            animation-fill-mode: forwards;
          }
        }

        &__square_qv {
          &4, &8, &16, &32 {
            opacity: 0;
          }
        }
      }
    }

    &-3 {
      #{$root}__square {
        &__text {
          opacity: 1;
        }
        &_qv {
          &4, &8, &16, &32 {
            transition: opacity 0.15s ease-out;
            opacity: 1;
            transform: translate(-50%, 50%) scale(0) translate(50%, -50%);
            animation: .3s ease-out 0s crescentQVAnimation;
            animation-fill-mode: forwards;
          }
          &8, &16, &32 {
            transition-delay: 0.2s;
            transform: translate(-50%, 50%) scale(0) translate(50%, -50%);
          }
          &8 {
            animation-delay: 0.4s;
          }
          &16 {
            animation-delay: 0.7s;
          }
          &32 {
            animation-delay: 1s;
          }
        }
      }
    }

    &-4 {
      #{$root}__square :deep() > .sketch-square {
        &__lines {
          transition: opacity 0.5s ease-out;
          opacity: 0;
        }
        &__content {
          transition: box-shadow 0.5s ease-out;
          box-shadow: 3px -3px 0 2px rgba(141, 155, 171, 0.0);
        }
      }

      #{$root}__square {
        &__content:hover :deep() #{$root}__square__tooltip {
          display: none;
        }
        &__content :deep() .layers-circuit__circuit-line__ket0 {
          opacity: 1;
        }
        &__text {
          transition: opacity 0.5s ease-out;
          opacity: 0;
        }
        &_qv {
          &4, &8, &16 {
            transition: opacity 0.5s ease-out;
            opacity: 0;
            pointer-events: none;
          }
        }
      }
    }

    &-5 {
      :deep() .sketch-square {
        &__lines {
          transition: opacity 0.5s ease-out;
        }
        &__content {
          transition: box-shadow 0.5s ease-out;
        }
      }

      #{$root}__square {
        &__content :deep() .layers-circuit__circuit-line__ket0 {
          opacity: 1;
        }
        &__text {
          transition: opacity 0.5s ease-out;
        }
        &_qv {
          &4, &8, &16 {
            transition: opacity 0.5s ease-out;
          }
        }
      }
    }

  }
}
</style>
