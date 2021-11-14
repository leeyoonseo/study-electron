// onload - 외부자원과 이미지 로드가 모두 끝났을때 발생
// DOMContentLoaded - dom이 로드가 끝났을때 발생
document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('comment-form');

  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const commentInput = document.getElementById('comment-input');

    if (commentInput.value === '') {
      return false;
    }

    const comments = document.getElementById('comments')
    const newComment = document.createElement('li');
    newComment.innerText = commentInput.value;

    comments.appendChild(newComment);
    commentInput.value = '';
    return false;
  });
});