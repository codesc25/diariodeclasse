import config from "config";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('diario-form');
    const exportPdfBtn = document.getElementById('export-pdf');
    const savedDataDiv = document.getElementById('saved-data'); 

    // Load data from localStorage
    loadData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        saveData();
    });

    exportPdfBtn.addEventListener('click', function() {
        exportToPdf();
    });

    function saveData() {
        const formData = {
            data: document.getElementById('data').value,
            professor: document.getElementById('professor').value,
            disciplina: document.getElementById('disciplina').value,
            turma: document.getElementById('turma').value,
            cargaHoraria: document.getElementById('cargaHoraria').value,
            conteudo: document.getElementById('conteudo').value,
            observacoes: document.getElementById('observacoes').value
        };
        localStorage.setItem(config.localStorageKey, JSON.stringify(formData));
        displaySavedData(formData); 
        alert('Dados salvos!');
    }

    function loadData() {
        const savedData = localStorage.getItem(config.localStorageKey);
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('data').value = formData.data;
            document.getElementById('professor').value = formData.professor;
            document.getElementById('disciplina').value = formData.disciplina;
            document.getElementById('turma').value = formData.turma;
            document.getElementById('cargaHoraria').value = formData.cargaHoraria;
            document.getElementById('conteudo').value = formData.conteudo;
            document.getElementById('observacoes').value = formData.observacoes;
            displaySavedData(formData); 
        }
    }

    function displaySavedData(data) {
        savedDataDiv.innerHTML = `
            <h3>Dados Salvos:</h3>
            <p><strong>Data:</strong> ${data.data}</p>
            <p><strong>Professor:</strong> ${data.professor}</p>
            <p><strong>Disciplina:</strong> ${data.disciplina}</p>
            <p><strong>Turma:</strong> ${data.turma}</p>
            <p><strong>Carga Horária:</strong> ${data.cargaHoraria}</p>
            <p><strong>Conteúdo:</strong> ${data.conteudo}</p>
            <p><strong>Observações:</strong> ${data.observacoes}</p>
        `;
    }

    function exportToPdf() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let y = 20; 

        // Function to add text to PDF
        function addText(text, x, y) {
            doc.setFontSize(12);
            doc.text(text, x, y);
            return y + 10; 
        }

        doc.setFontSize(16);
        doc.text("Diário de Classe", 20, y);
        y += 20;

        // Retrieve data from form fields
        const data = document.getElementById('data').value;
        const professor = document.getElementById('professor').value;
        const disciplina = document.getElementById('disciplina').value;
        const turma = document.getElementById('turma').value;
        const cargaHoraria = document.getElementById('cargaHoraria').value;
        const conteudo = document.getElementById('conteudo').value;
        const observacoes = document.getElementById('observacoes').value;

        // Add data to PDF
        y = addText(`Data: ${data}`, 20, y);
        y = addText(`Professor: ${professor}`, 20, y);
        y = addText(`Disciplina: ${disciplina}`, 20, y);
        y = addText(`Turma: ${turma}`, 20, y);
        y = addText(`Carga Horária: ${cargaHoraria}`, 20, y);
        y = addText(`Conteúdo: ${conteudo}`, 20, y);
        y = addText(`Observações: ${observacoes}`, 20, y);

        // Save the PDF
        doc.save('diario-de-classe.pdf');
    }
});
