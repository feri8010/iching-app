import * as pdfjsLib from 'pdf.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';

// PDF を読み込む
const loadingTask = pdfjsLib.getDocument('sample.pdf');
loadingTask.promise.then(pdf => {
    console.log('PDF loaded');
    // 1ページ目を取得して描画する例
    pdf.getPage(1).then(page => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
});
