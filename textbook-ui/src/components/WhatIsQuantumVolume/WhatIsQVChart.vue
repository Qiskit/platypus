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

    $layer-width: 50px;
    $layer-gap: 35px;
    $layer-start: 20px;

    &__layer {
      position: absolute;
      top: 15px;
      right: $layer-start;
      transition: transform 0.3s ease-out;

      @for $i from 0 to 5 {
        &_#{$i} {
          right: $layer-start + ($layer-width + $layer-gap) * $i;
          --layer-index: #{$i};
        }
      }
      &_hovering {
        --layer-hovering: 1;
      }
    }

    $line-gap: 85px;
    $line-start: 55px;

    &__qubit-line {
      position: absolute;
      top: $line-start;
      left: 25px;

      --stroke-color: #000000;
      :deep() path {
        stroke: var(--stroke-color);
      }
      @for $i from 0 to 5 {
        &_#{$i} {
          top: $line-start + $line-gap * $i;
        }
      }
    }

    $ket0-gap: 85px;
    $ket0-start: $line-start - 7px;

    &__ket0 {
      position: absolute;
      top: $ket0-start;
      left: 0px;

      @for $i from 0 to 5 {
        &_#{$i} {
          top: $ket0-start + $ket0-gap * $i;
        }
      }
    }

    &__unitary {
      position: absolute;
      right: $layer-start;
      pointer-events: none;
      opacity: 0;

      & :deep() .sketch-square__content {
        background-color: white;
        padding: 50% 25px;
        text-align: center;
      }

      @for $i from 0 to 5 {
        &_col-#{$i} {
          right: $layer-start + ($layer-width + $layer-gap) * $i;
        }
      }
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

    @keyframes linesDisplay {
      from {
        stroke-dashoffset: 500;
      }
      to {
        stroke-dashoffset: 0;
      }
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
        &__ket0 {
          opacity: 0;
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
        &__ket0 {
          transition: opacity 0.5s ease-out 0.5s;
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

        &__layer {
          --displacement_1: calc(var(--layer-index) * var(--layer-before, 1) * 100% + var(--layer-before, 1) * 25%);
          --displacement_2: calc((4 - var(--layer-index)) * (1 - var(--layer-before, 1)) * -100% - (1 - var(--layer-before, 1)) * 25%);
          --displacement: calc(var(--displacement_1) + var(--displacement_2));
          transform: translateX(calc(var(--layer-hovering, 0) * var(--displacement))) scaleX(calc(calc(2 - var(--layer-hovering, 0))/2));
        }

        &__layer:hover {
          transform: translateX(calc((2 - var(--layer-index)) * -100%)) scaleX(5);
        }

        &__layer:hover ~ #{$root}__square__layer {
          --layer-before: 0;
          //transform: scaleX(var(--layer-scale, 1));
        }

        &__layer:hover ~ #{$root}__square__unitary {
          opacity: 1;

          & :deep() .sketch-square__content {
            opacity: 0;
            animation: 0.2s ease-out 0.5s fadeIn;
            animation-fill-mode: forwards;
          }
          & :deep() .sketch-line-path {
            stroke-dasharray: 500;
            animation: 3s ease-out 0s linesDisplay;
            animation-fill-mode: forwards;
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
