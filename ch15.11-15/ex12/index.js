document.getElementById('uploadForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const accessToken = document.getElementById('accessToken').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  if (!accessToken || !file) {
    alert('アクセストークンとファイルを入力してください。');
    return;
  }

  const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': file.type
      },
      body: file
    });

    if (response.ok) {
      alert('ファイルが正常にアップロードされました。');
    } else {
      const errorData = await response.json();
      alert(`アップロードに失敗しました: ${errorData.error.message}`);
    }
  } catch (error) {
    alert(`エラーが発生しました: ${error.message}`);
  }
});