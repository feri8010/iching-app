// main.js

// PDF.js ライブラリの読み込み
import * as pdfjsLib from './pdf.js';
import './pdf_viewer.js';

// ワーカーの指定
pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.js';

// PDF Viewer の初期化
document.addEventListener('DOMContentLoaded', () => {
    if (typeof PDFViewerApplication !== 'undefined') {
        // タッチ操作を有効化（タブレット対応）
        PDFViewerApplicationOptions.set('enableTouch', true);

        // PDFファイルをロード（例: sample.pdf を同階層に置く）
        PDFViewerApplication.open('sample.pdf');

        // ページジャンプ用のイベント例
        const pageInput = document.getElementById('page-number');
        if (pageInput) {
            pageInput.addEventListener('change', (e) => {
                const page = parseInt(e.target.value, 10);
                if (!isNaN(page)) {
                    PDFViewerApplication.page = page;
                }
            });
        }
    } else {
        console.error('PDFViewerApplication が未定義です。pdf_viewer.js が正しく読み込まれているか確認してください。');
    }
});
