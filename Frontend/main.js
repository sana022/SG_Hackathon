document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');
    const macrosContainer = document.getElementById('macros-container');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('macro-name').value;
      const content = document.getElementById('macro-content').value;
  
      fetch('/api/macros/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content }),
      })
        .then(response => response.json())
        .then(data => {
          const macroDiv = document.createElement('div');
          macroDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Documentation:</strong> ${data.documentation}</p>
            <pre><strong>Transformed Code:</strong> ${data.transformedCode}</pre>
          `;
          macrosContainer.appendChild(macroDiv);
        })
        .catch(error => {
          console.error('Error uploading macro:', error);
        });
    });
  
    function fetchMacros() {
      fetch('/api/macros')
        .then(response => response.json())
        .then(data => {
          macrosContainer.innerHTML = '';
          data.forEach(macro => {
            const macroDiv = document.createElement('div');
            macroDiv.innerHTML = `
              <h2>${macro.name}</h2>
              <p><strong>Documentation:</strong> ${macro.documentation}</p>
              <pre><strong>Transformed Code:</strong> ${macro.transformedCode}</pre>
            `;
            macrosContainer.appendChild(macroDiv);
          });
        })
        .catch(error => {
          macrosContainer.innerHTML = '<p>Error fetching macros</p>';
          console.error('Error fetching macros:', error);
        });
    }
  
    fetchMacros();
  });
   