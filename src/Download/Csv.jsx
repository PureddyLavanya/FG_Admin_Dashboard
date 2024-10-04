export const exportDataToCSV = (transformedData, title) => {
  // Calculate the maximum length of 'label' and 'value' for spacing
  const maxLabelLength = Math.max(
    'Meter Status'.length,
    ...transformedData.map(({ label }) => label.length)
  );
  
  const maxValueLength = Math.max(
    'No of Meters'.length,
    ...transformedData.map(({ value }) => String(value).length) // Convert numbers to strings
  );

  // Helper function to pad content with spaces for alignment
  const padRight = (str, length) => {
    return str + ' '.repeat(length - str.length);
  };

  // Generate rows with padded columns
  const txtRows = [
    [title],
    [''],
    [padRight('Meter Status', maxLabelLength), padRight('No of Meters', maxValueLength)].join('  '),
    ...transformedData.map(({ label, value }) => [
      padRight(label, maxLabelLength),
      padRight(String(value), maxValueLength)
    ].join('  '))
  ];

  // Convert rows into TXT format with aligned columns
  const txtContent = txtRows.join("\n");
  const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.txt`;  // Save as .txt instead of .csv
  link.click();
  URL.revokeObjectURL(url);
};
