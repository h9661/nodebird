# sns 서비스 만들기


## 체크포인트
- [x] 프로젝트 초기 새팅하기
- [x] 데이터베이스 설정 완료
- [ ] 각 nunjunks 파일들과 script 이해하기
- [ ] model의 관계들과 설정법 이해하기

## 학습 정리
1. dotenv

https://www.daleseo.com/js-dotenv/

2. morgan

node js 로그 관리 라이브러리이다. 자세하게 알 필요는 없을 것 같다. 진행하면서 배우자.

3. .env 파일에 환경 변수를 집어넣으면, dotenv 라이브러리가 읽어서 process.env에 넣어준다.

4. res.locals는 뭘까?

`res.locals`는 Express.js에서 사용되는 객체입니다. 이 객체는 미들웨어에서 다음 미들웨어나 라우터 핸들러로 데이터를 전달하는 데 사용됩니다. `res.locals`에 저장된 데이터는 해당 요청에 대한 라이프사이클 동안 유지되며, 이를 통해 데이터 공유와 전달이 용이해집니다.

보통 이 객체를 사용하여 뷰 템플릿 엔진에서 사용할 데이터를 저장하거나, 미들웨어 사이에서 상태를 전달하거나 공유할 때 활용합니다. 예를 들어, 사용자가 로그인한 상태를 저장하거나, 뷰 템플릿에서 동적으로 생성된 데이터를 전달할 때 `res.locals`를 사용할 수 있습니다.

```jsx
app.use(function(req, res, next) {
  res.locals.currentUser = req.user; // 예시: 현재 로그인한 사용자 정보를 저장
  next();
});

app.get('/', function(req, res) {
  // 이제 라우터 핸들러에서 res.locals.currentUser를 사용할 수 있음
  res.render('index', { user: res.locals.currentUser });
});
```
위의 코드 예시에서 `res.locals.currentUser`는 모든 라우터 핸들러에서 접근 가능한 데이터로 사용될 수 있습니다. 이를 통해 중복된 코드를 피하고 요청 처리 과정에서 데이터를 효율적으로 전달할 수 있습니다.

5.
```
{% block <name>}
{% endblock %}
```
이것의 의미는 무엇일까?

`{% block content %}`와 `{% endblock %}`는 Nunjucks라는 템플릿 엔진에서 사용되는 문법입니다. 이 코드는 Nunjucks의 블록 구문을 나타냅니다.

Nunjucks에서 블록은 `템플릿 상속과 확장`을 위해 사용됩니다. `템플릿 상속`은 웹 페이지의 공통된 레이아웃을 정의하고, 이 레이아웃을 기반으로 각 페이지의 콘텐츠를 구성하는 기술입니다.

`{% block content %}`: 이 부분은 부모 템플릿에서 자식 템플릿에게 "content"라는 이름의 블록을 제공하고 있습니다. 이 블록은 자식 템플릿에서 채워질 공간을 의미합니다. 자식 템플릿에서 이 블록을 확장하여 콘텐츠를 채워넣을 수 있습니다.

`{% endblock %}`: 블록의 끝을 나타냅니다. 부모 템플릿의 블록을 닫는 역할을 합니다.

아래는 템플릿 상속을 활용한 Nunjucks의 예시입니다:

부모 템플릿 (base.njk):
```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}Default Title{% endblock %}</title>
</head>
<body>
    <div class="content">
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```

자식 템플릿 (page.njk):
```html
{% extends 'base.njk' %}

{% block title %}Page Title{% endblock %}

{% block content %}
    <h1>Welcome to the Page!</h1>
    <p>This is the content of the page.</p>
{% endblock %}
```
이 예시에서 `base.njk`는 레이아웃을 정의하고, `page.njk`은 `base.njk`을 확장하여 페이지의 콘텐츠를 채우고 있습니다. Nunjucks의 block과 extends 문법을 사용하여 템플릿을 구성하고 확장할 수 있습니다.

6. `location.reload()` 현재 page를 새로고침한다. 매개변수의 값을 true로 넣으면 브라우저의 캐시를 무시하고 새로고침을 수행한다.

7. Sequelize에서 관계를 표현하는 방법
`1:N -> hasMany, belongsTo`
belongsTo의 table에 hasMany의 key id column이 추가된다.

`1:1 -> hasOne, belongsTo`
belongsTo의 table에 hasOne의 key id column이 추가된다.

`N:M -> belongsToMany, belongsToMany`
두 table 사이의 관계가 id 값으로 나타난 table이 생성된다. table의 이름은 through 속성에 담긴 value로 결정된다.