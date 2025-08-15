import * as pdfjsLib from './pdf.js';
import { PDFViewerApplicationOptions } from './pdf_viewer.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.js';
PDFViewerApplicationOptions.set('enableTouch', true);
PDFViewerApplicationOptions.set('defaultZoomValue', 'page-width');

const pdfUrl = './sample.pdf';
let pdfDocument = null;

// PDFをロード
async function loadPDF(url) {
    const loadingTask = pdfjsLib.getDocument(url);
    pdfDocument = await loadingTask.promise;
    renderPage(1); // 初期は1ページ目表示
}

// ページレンダリング
async function renderPage(pageNumber) {
    if (!pdfDocument) return;
    if (pageNumber < 1 || pageNumber > pdfDocument.numPages) return;

    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const container = document.getElementById('viewerContainer');
    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.appendChild(canvas);

    const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
    };
    await page.render(renderContext).promise;
}

// 卦名リンククリック時のイベント設定
document.getElementById('kagelinks').addEventListener('click', (e) => {
    e.preventDefault();
    const page = parseInt(e.target.getAttribute('data-page'));
    if (!isNaN(page)) {
        renderPage(page);
    }
});

loadPDF(pdfUrl);
