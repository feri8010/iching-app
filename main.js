// main.js
import * as pdfjsLib from './pdf.js';
import { PDFViewerApplicationOptions } from './pdf_viewer.js';

// Workerの指定
pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.js';

// PDFビューアのオプション設定
PDFViewerApplicationOptions.set('enableTouch', true);
PDFViewerApplicationOptions.set('defaultZoomValue', 'page-width');

// PDFをロードして表示
async function loadPDF(url) {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdfDocument = await loadingTask.promise;

    const container = document.getElementById('viewerContainer');
    container.innerHTML = ''; // 前回の内容をクリア

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

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
}

// ページジャンプ用の関数
async function goToPage(url, pageNumber) {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdfDocument = await loadingTask.promise;

    if (pageNumber < 1 || pageNumber > pdfDocument.numPages) {
        alert(`ページ番号は1～${pdfDocument.numPages}の範囲です`);
        return;
    }

    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const container = document.getElementById('viewerContainer');
    container.innerHTML = ''; // 既存ページをクリア

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

// 初期表示PDFを指定
const pdfUrl = './sample.pdf'; // 表示したいPDFファイル名
loadPDF(pdfUrl);

// 例：ページジャンプ用（必要に応じてフォームのイベントに接続）
window.goToPage = (pageNumber) => goToPage(pdfUrl, pageNumber);
