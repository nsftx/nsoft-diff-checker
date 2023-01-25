require('jquery');
require('codemirror/lib/codemirror');
require('codemirror/addon/search/searchcursor');
require('codemirror/lib/codemirror.css');
require('mergely/lib/mergely');
require('mergely/lib/mergely.css');
require('./index.css');

let activeMenu = false;
let wrap_lines = false;
let ignorecase = false;
let ignorews = false;
let ignoreaccents = false;
let line_numbers = true;
let lcs = true;
let viewport = false;
let autoupdate = true;
const menuItems = document.querySelectorAll('.menu-item');
const tooltip = document.querySelector('.tooltip');
const tooltipText = document.querySelector('.tooltip-text');

function resetMenu() {
  menuItems.forEach((item) => {
    item.classList.remove('active');
  });
}

function showtooltip(text, e) {
  e.stopPropagation();
  const rect = e.target.getBoundingClientRect();
  tooltipText.innerHTML = text;
  tooltip.style = `visibility: visible; opacity: 1; top: ${rect.bottom}px; left: ${rect.right - ((rect.right - rect.left) / 2) - (tooltipText.clientWidth / 2)}px`;
  e.target.addEventListener('pointerleave', function remove(event) {
    tooltip.style = '';
    tooltipText.innerHTML = '';
    event.target.removeEventListener('pointerleave', remove);
  });
}

$(() => {
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      e.target.classList.toggle('active');
      activeMenu = !activeMenu;
    });
    item.addEventListener('pointerenter', (e) => {
      if (activeMenu && e.pointerType !== 'touch') {
        resetMenu();
        e.target.classList.toggle('active');
      }
    });
  });
  document.querySelectorAll('.dropdown').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
  document.documentElement.addEventListener('click', (e) => {
    e.stopPropagation();
    resetMenu();
    activeMenu = false;
  });
  $('#mergely').mergely({
    license: 'mpl-separate-notice',
    vpcolor: '#3883fa',
  });

  document.querySelector('#undo-left').addEventListener('click', () => {
    $('#mergely').mergely('cm', 'lhs').execCommand('undo');
  });
  document.querySelector('#redo-left').addEventListener('click', () => {
    $('#mergely').mergely('cm', 'lhs').execCommand('redo');
  });
  document.querySelector('#clear-left').addEventListener('click', () => {
    $('#mergely').mergely('clear', 'lhs');
  });
  document.querySelector('#undo-right').addEventListener('click', () => {
    $('#mergely').mergely('cm', 'rhs').execCommand('undo');
  });
  document.querySelector('#redo-right').addEventListener('click', () => {
    $('#mergely').mergely('cm', 'rhs').execCommand('redo');
  });
  document.querySelector('#clear-right').addEventListener('click', () => {
    $('#mergely').mergely('clear', 'rhs');
  });

  document
    .querySelector('#ignore-case')
    .addEventListener('click', (e) => {
      ignorecase = !ignorecase;
      e.target.classList.toggle('active');
      $('#mergely').mergely('options', {
        ignorecase,
      });
    });
  document
    .querySelector('#ignore-space')
    .addEventListener('click', (e) => {
      ignorews = !ignorews;
      e.target.classList.toggle('active');
      $('#mergely').mergely('options', {
        ignorews,
      });
    });
  document
    .querySelector('#ignore-accents')
    .addEventListener('click', (e) => {
      ignoreaccents = !ignoreaccents;
      e.target.classList.toggle('active');
      $('#mergely').mergely('options', {
        ignoreaccents,
      });
    });
  document.querySelector('#lcs').addEventListener('click', (e) => {
    lcs = !lcs;
    e.target.classList.toggle('active');
    $('#mergely').mergely('options', {
      lcs,
    });
  });
  document.querySelector('#viewport').addEventListener('click', (e) => {
    viewport = !viewport;
    e.target.classList.toggle('active');
    $('#mergely').mergely('options', {
      viewport,
    });
  });
  document.querySelector('#auto-update').addEventListener('click', (e) => {
    autoupdate = !autoupdate;
    e.target.classList.toggle('active');
    $('#mergely').mergely('options', {
      autoupdate,
    });
  });
  document.querySelector('#update').addEventListener('click', () => {
    $('#mergely').mergely('update');
  });
  document
    .querySelector('#line-numbers')
    .addEventListener('click', (e) => {
      line_numbers = !line_numbers;
      e.target.classList.toggle('active');
      $('#mergely').mergely('options', {
        line_numbers,
      });
    });
  document.querySelector('#line-wrap').addEventListener('click', (e) => {
    wrap_lines = !wrap_lines;
    e.target.classList.toggle('active');
    $('#mergely').mergely('options', {
      wrap_lines,
    });
  });
  document.querySelector('#license').addEventListener('click', () => {
    document.querySelector('#license-dialog').classList.add('active');
  });
  const upload = document.querySelector('#upload');
  upload.addEventListener('click', () => {
    document.querySelector('#upload-dialog').classList.add('active');
  });
  upload.addEventListener('pointerenter', (e) => {
    showtooltip('Load file', e);
  });
  const downloadDiff = document.querySelector('#download-diff');
  downloadDiff.addEventListener('click', () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/plain;charset=utf-8, ${encodeURIComponent($('#mergely').mergely('diff'))}`,
    );
    element.setAttribute('download', 'changes.diff');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
  downloadDiff.addEventListener('pointerenter', (e) => {
    showtooltip('Download .diff', e);
  });
  document.querySelectorAll('.next-change').forEach((element) => {
    element.addEventListener('click', () => {
      $('#mergely').mergely('scrollToDiff', 'next');
    });
    if (element.classList.contains('button')) {
      element.addEventListener('pointerenter', (e) => {
        showtooltip('Select next change', e);
      });
    }
  });
  document.querySelectorAll('.prev-change').forEach((element) => {
    element.addEventListener('click', () => {
      $('#mergely').mergely('scrollToDiff', 'prev');
    });
    if (element.classList.contains('button')) {
      element.addEventListener('pointerenter', (e) => {
        showtooltip('Select previous change', e);
      });
    }
  });
  document.querySelectorAll('.merge-change-left').forEach((element) => {
    element.addEventListener('click', () => {
      $('#mergely').mergely('mergeCurrentChange', 'lhs');
    });
    if (element.classList.contains('button')) {
      element.addEventListener('pointerenter', (e) => {
        showtooltip('Merge change left', e);
      });
    }
  });
  document.querySelectorAll('.merge-change-right').forEach((element) => {
    element.addEventListener('click', () => {
      $('#mergely').mergely('mergeCurrentChange', 'rhs');
    });
    if (element.classList.contains('button')) {
      element.addEventListener('pointerenter', (e) => {
        showtooltip('Merge change right', e);
      });
    }
  });
  document.querySelectorAll('.merge-all-left').forEach((element) => {
    element.addEventListener('click', () => {
      $('#mergely').mergely('merge', 'lhs');
    });
    if (element.classList.contains('button')) {
      element.addEventListener('pointerenter', (e) => {
        showtooltip('Merge all left', e);
      });
    }
  });
  document.querySelectorAll('.merge-all-right').forEach((element) => {
    element.addEventListener('click', () => {
      $('#mergely').mergely('merge', 'rhs');
    });
    if (element.classList.contains('button')) {
      element.addEventListener('pointerenter', (e) => {
        showtooltip('Merge all right', e);
      });
    }
  });
  const swap = document.querySelector('#swap-sides');
  swap.addEventListener('click', () => {
    $('#mergely').mergely('swap');
  });
  swap.addEventListener('pointerenter', (e) => {
    showtooltip('Swap sides', e);
  });
  document.querySelector('#upload-left').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (readerEvent) => {
      $('#mergely').mergely('lhs', readerEvent.target.result);
    };
  });
  document.querySelector('#upload-right').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (readerEvent) => {
      $('#mergely').mergely('rhs', readerEvent.target.result);
    };
  });
  document.querySelector('#upload-dialog-overlay').addEventListener('click', () => {
    document.querySelector('#upload-dialog').classList.remove('active');
  });
  document.querySelector('#close-upload-dialog').addEventListener('click', () => {
    document.querySelector('#upload-dialog').classList.remove('active');
  });
  document.querySelector('#license-dialog-overlay').addEventListener('click', () => {
    document.querySelector('#license-dialog').classList.remove('active');
  });
  document.querySelector('#close-license-dialog').addEventListener('click', () => {
    document.querySelector('#license-dialog').classList.remove('active');
  });
  document.documentElement.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' && e.altKey) {
      $('#mergely').mergely('mergeCurrentChange', 'rhs');
    } else if (e.key === 'ArrowLeft' && e.altKey) {
      $('#mergely').mergely('mergeCurrentChange', 'lhs');
    } else if (e.key === 'ArrowDown' && e.altKey) {
      $('#mergely').mergely('scrollToDiff', 'next');
    } else if (e.key === 'ArrowUp' && e.altKey) {
      $('#mergely').mergely('scrollToDiff', 'prev');
    }
  });
});
