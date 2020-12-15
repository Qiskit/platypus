// =============================================================================
// Quantum States and Qubits
// =============================================================================


//import '../shared/shared';
import {$N, animate, ElementView, InputView, observe, SVGView, thread} from '@mathigon/boost';
import {isPrime, lcm, numberFormat, Random} from '@mathigon/fermat';
import {delay, isOneOf, list, sortBy, total} from '@mathigon/core';
import {Gameplay, Slideshow, Step} from '../shared/types';

import {qiskitScore} from '../shared/shared';

export function statesQubitsIntro($section: Step) {
  const $blade = $section.$('input#blade') as InputView;
  const $unit = $section.$('input#unit') as InputView;
  const $horse = $section.$('input#horse') as InputView;

  [$blade, $unit, $horse].forEach(elt => {
    elt.on('click', () => {
      if (elt.checked) {
        qiskitScore($section, ['bit-description']);
      }
    })
  })
}

export function binaryNumberSystem($section: Step) {
  const $decinput = $section.$('input#decinput') as InputView;
  const $bininput = $section.$('input#bininput') as InputView;
  $decinput.onKeyDown('enter', () => $decinput.blur());
  $bininput.onKeyDown('enter', () => $bininput.blur());

  function fill_inputs(v) {
    if (!v) return $section.model.result = '';

    if (v < 0) return $section.model.result = "Sorry! Number can't be negative";

    if (v > Number.MAX_SAFE_INTEGER) {
      return $section.model.result = $section.getText('too-large');
    }

    // $section.score('calculator');
    qiskitScore($section, ['calculator']);

    $decinput.value = v;
    $bininput.value = v.toString(2);
  }

  $decinput.on('change', () => {
	  let v = parseInt($decinput.value, 10);
	  $section.model.result = "";
	  fill_inputs(v);
  });
  $bininput.on('change', () => {
	  let v = parseInt($bininput.value, 2);
	  if ( isNaN(v) ) {
		  $section.model.result = "That's not a binary number!";
	  } else {
		$section.model.result = "";
	  	fill_inputs(v);
	  }
  });
}
