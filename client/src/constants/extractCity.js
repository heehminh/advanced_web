export const extractCity = (address) => {
    // 정규 표현식을 사용하여 '도시+구' 패턴을 추출
    const pattern = /[가-힣]+시\s[가-힣]+구|[가-힣]+시\s[가-힣]+군|[가-힣]+도\s[가-힣]+시|[가-힣]+도\s[가-힣]+군|[가-힣]+시\s[가-힣]+읍/;
    const match = address.match(pattern);

    // 매치가 있으면 해당 부분을 반환하고, 없으면 null을 반환
    return match ? match[0] : null;
}