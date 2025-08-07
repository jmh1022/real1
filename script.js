
document.addEventListener('DOMContentLoaded', function() {
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('result');
    const selectedNumbersDiv = document.getElementById('selectedNumbers');
    
    drawBtn.addEventListener('click', drawCleaningDuty);
    resetBtn.addEventListener('click', resetSelection);
    
    function drawCleaningDuty() {
        // SweetAlert2 확인 대화상자
        Swal.fire({
            title: '청소당번을 뽑으시겠습니까?',
            text: '1번부터 25번까지 중에서 5명을 랜덤으로 선택합니다.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-dice me-2"></i>뽑기!',
            cancelButtonText: '<i class="fas fa-times me-2"></i>취소',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-primary me-3',
                cancelButton: 'btn btn-outline-secondary'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                performDraw();
            }
        });
    }
    
    function performDraw() {
        // 로딩 표시
        Swal.fire({
            title: '청소당번을 뽑는 중...',
            text: '잠시만 기다려주세요.',
            icon: 'info',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        setTimeout(() => {
            // 1부터 25까지의 숫자 배열 생성
            const numbers = Array.from({length: 25}, (_, i) => i + 1);
            
            // 랜덤으로 5개 숫자 선택
            const selectedNumbers = [];
            const availableNumbers = [...numbers];
            
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                selectedNumbers.push(availableNumbers.splice(randomIndex, 1)[0]);
            }
            
            // 선택된 숫자를 오름차순으로 정렬
            selectedNumbers.sort((a, b) => a - b);
            
            // 결과 표시
            displayResults(selectedNumbers);
            
            // 성공 메시지 표시
            Swal.fire({
                title: '청소당번이 선택되었습니다!',
                text: `선택된 번호: ${selectedNumbers.join(', ')}번`,
                icon: 'success',
                confirmButtonText: '<i class="fas fa-check me-2"></i>확인',
                customClass: {
                    confirmButton: 'btn btn-success'
                },
                buttonsStyling: false
            });
            
            // 버튼 상태 변경
            drawBtn.style.display = 'none';
            resultContainer.style.display = 'block';
            resultContainer.classList.add('show');
            
        }, 2000);
    }
    
    function displayResults(numbers) {
        selectedNumbersDiv.innerHTML = '';
        
        numbers.forEach((number, index) => {
            setTimeout(() => {
                const numberBadge = document.createElement('div');
                numberBadge.className = 'number-badge';
                numberBadge.textContent = number;
                
                // 부트스트랩 툴팁 추가
                numberBadge.setAttribute('data-bs-toggle', 'tooltip');
                numberBadge.setAttribute('data-bs-placement', 'top');
                numberBadge.setAttribute('title', `${number}번 학생`);
                
                selectedNumbersDiv.appendChild(numberBadge);
                
                // 툴팁 초기화
                const tooltip = new bootstrap.Tooltip(numberBadge);
                
            }, index * 300); // 0.3초 간격으로 순차적으로 표시
        });
    }
    
    function resetSelection() {
        Swal.fire({
            title: '다시 뽑으시겠습니까?',
            text: '현재 결과가 삭제되고 새로 뽑을 수 있습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-redo me-2"></i>다시 뽑기',
            cancelButtonText: '<i class="fas fa-times me-2"></i>취소',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-warning me-3',
                cancelButton: 'btn btn-outline-secondary'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                selectedNumbersDiv.innerHTML = '';
                resultContainer.style.display = 'none';
                resultContainer.classList.remove('show');
                drawBtn.style.display = 'inline-block';
                
                // 성공 메시지
                Swal.fire({
                    title: '초기화 완료!',
                    text: '다시 청소당번을 뽑을 수 있습니다.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }
    
    // 페이지 로드 시 환영 메시지
    setTimeout(() => {
        Swal.fire({
            title: '청소당번 뽑기에 오신 것을 환영합니다!',
            text: '공정한 랜덤 선택으로 청소당번을 뽑아보세요.',
            icon: 'info',
            confirmButtonText: '<i class="fas fa-thumbs-up me-2"></i>시작하기',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        });
    }, 500);
});
