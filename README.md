# sns 서비스 만들기


## 체크포인트
- [x] 프로젝트 초기 새팅하기
- [x] 데이터베이스 설정 완료
- [x] 각 nunjunks 파일들과 script 이해하기
- [x] model의 관계들과 설정법 이해하기
- [x] login 기능 구현
- [x] multer로 사진 업로드 구현
- [x] hashtag로 검색 기능 추가
- [x] follow 기능 추가
- [x] following 끊기 기능 추가
- [ ] 프로필 정보 변경 기능 추가
- [ ] 게시글 좋아요 및 취소 추가.
- [ ] 게시글 삭제하기 추가.

## 학습 정리
## dotenv

https://www.daleseo.com/js-dotenv/

## morgan

node js 로그 관리 라이브러리이다. 자세하게 알 필요는 없을 것 같다. 진행하면서 배우자.

## .env 파일에 환경 변수를 집어넣으면, dotenv 라이브러리가 읽어서 process.env에 넣어준다.

## res.locals는 뭘까?

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

##
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

## `location.reload()` 현재 page를 새로고침한다. 매개변수의 값을 true로 넣으면 브라우저의 캐시를 무시하고 새로고침을 수행한다.

## Sequelize에서 관계를 표현하는 방법

1. **1:N (One-to-Many) 관계 예시**:
   1명의 작성자(User)가 여러 개의 게시물(Post)을 작성하는 관계입니다.

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
});

// 1:N 관계 정의
User.hasMany(Post);
Post.belongsTo(User);

// 테이블 생성 및 관계 설정
sequelize.sync({ force: true }).then(async () => {
  const user = await User.create({ username: 'john_doe' });
  await user.createPost({ title: 'First Post' });
  await user.createPost({ title: 'Second Post' });

  const posts = await Post.findAll({ include: User });
  console.log(posts);
});
```

2. **1:1 (One-to-One) 관계 예시**:
   각각의 사용자(User)가 하나의 프로필(Profile)을 가지는 관계입니다.

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

const Profile = sequelize.define('Profile', {
  fullName: DataTypes.STRING,
});

// 1:1 관계 정의
User.hasOne(Profile);
Profile.belongsTo(User);

// 테이블 생성 및 관계 설정
sequelize.sync({ force: true }).then(async () => {
  const user = await User.create({ username: 'jane_doe' });
  await user.createProfile({ fullName: 'Jane Doe' });

  const profile = await Profile.findOne({ include: User });
  console.log(profile);
});
```

3. **N:M (Many-to-Many) 관계 예시**:
   여러 학생(Student)이 여러 과목(Subject)을 수강하는 관계입니다.

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
});

const Subject = sequelize.define('Subject', {
  title: DataTypes.STRING,
});

// N:M 관계 정의
Student.belongsToMany(Subject, { through: 'StudentSubject' });
Subject.belongsToMany(Student, { through: 'StudentSubject' });

// 테이블 생성 및 관계 설정
sequelize.sync({ force: true }).then(async () => {
  const student = await Student.create({ name: 'Alice' });
  const subject = await Subject.create({ title: 'Math' });

  await student.addSubject(subject);
  const subjects = await student.getSubjects();
  console.log(subjects);
});
```

위의 코드 예시에서 Sequelize를 사용하여 각각의 관계를 정의하고 테이블을 생성하고 관계를 설정하고 있습니다. 이러한 예시를 참고하여 1:N, 1:1, N:M 관계를 각각 어떻게 정의하고 활용할 수 있는지 이해하실 수 있을 것입니다.


두 table 사이의 관계가 id 값으로 나타난 table이 생성된다. table의 이름은 through 속성에 담긴 value로 결정된다.

## Sequelize에서 관계 정의할 때 as는 무엇일까?

Sequelize에서 `as`는 관계 정의 시에 사용되는 옵션 중 하나입니다. 이 옵션은 모델 간의 관계를 정의하거나 쿼리할 때 사용되는 별칭(alias)을 설정하는 역할을 합니다. `as` 옵션을 사용하여 관계에 대한 별칭을 지정하면, 해당 별칭을 통해 쿼리를 작성하거나 관계를 사용할 수 있습니다.

`as` 옵션은 주로 다음 두 가지 상황에서 활용됩니다:

1. **관계 정의 시에 별칭 지정**: Sequelize에서 모델 간의 관계를 정의할 때, 관계에 사용할 이름을 `as` 옵션으로 지정할 수 있습니다. 이를 통해 해당 관계를 추후에 더 쉽게 사용할 수 있습니다.

   예시:
   ```javascript
   User.belongsToMany(User, {
     foreignKey: "followingId",
     as: "Followers",
     through: "Follow",
   });
   ```
   위의 코드에서 `as: "Followers"`는 "User" 모델이 팔로워를 나타내는 관계를 "Followers"라는 이름으로 지정하고 있습니다.

2. **쿼리 시에 별칭 활용**: 관계 정의에 지정한 `as` 별칭은 쿼리 시에 활용할 수 있습니다. 이를 통해 별칭을 사용하여 관계를 참조하고 조건을 지정할 수 있습니다.

   예시:
   ```javascript
   User.findAll({
     include: {
       model: User,
       as: "Followers",
     },
   });
   ```
   위의 코드에서 `as: "Followers"`를 사용하여 "Followers" 관계를 포함하여 `User` 모델을 조회하고 있습니다.

이처럼 `as` 옵션은 관계를 다루는 과정에서 읽기 쉬운 코드를 작성하고 별칭을 활용하여 관계를 구분하는 데 도움을 줍니다.


## sequelize migration

`sequelize`를 사용하여 migration을 통해 데이터베이스 테이블의 컬럼을 수정하는 과정은 아래와 같습니다. 아래 예시에서는 `email` 컬럼의 길이를 늘리는 작업을 가정하겠습니다.

1. **마이그레이션 파일 생성:** Sequelize는 마이그레이션 파일을 사용하여 데이터베이스 스키마의 변경 사항을 관리합니다. 아래와 같이 명령어를 통해 마이그레이션 파일을 생성합니다.

```bash
npx sequelize-cli migration:generate --name modify-email-column
```

위 명령어를 실행하면 `sequelize` 명령행 도구를 통해 새 마이그레이션 파일이 생성됩니다.

2. **마이그레이션 파일 수정:** 생성된 마이그레이션 파일을 열고, `up` 메서드와 `down` 메서드를 수정하여 변경 사항을 정의합니다.

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modify the column
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING(255), // New length
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
```

3. **마이그레이션 실행:** 아래 명령어를 사용하여 마이그레이션을 실행합니다.

```bash
npx sequelize-cli db:migrate
```

위 명령어를 실행하면 마이그레이션 파일의 `up` 메서드에 정의된 변경 사항이 데이터베이스에 적용됩니다.

4. **롤백 (Downgrade):** 변경 사항을 롤백하고 이전 상태로 돌리려면 아래 명령어를 사용합니다.

```bash
npx sequelize-cli db:migrate:undo
```

위 명령어를 실행하면 마이그레이션 파일의 `down` 메서드에 정의된 변경 사항이 적용되어 변경 내용이 롤백됩니다.

위 과정을 통해 `sequelize`를 사용하여 migration을 이용해 데이터베이스 테이블의 컬럼을 수정할 수 있습니다. 실제로는 데이터베이스 종류에 따라 다른 dialect를 사용하고, 변경 사항을 조정할 수 있을 것입니다.

## sequelize 관계 추가하는 법


1. **모델 정의와 관계 설정:** 이미 `User`와 `Project` 모델이 정의되어 있고 관계 설정이 필요한 경우, 아래와 같이 관계를 설정합니다.

```javascript
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Project = sequelize.define('Project', {
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// N:M 관계 설정
User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });
```

2. **데이터 추가:** 이미 모델과 관계가 설정된 경우, 데이터를 추가할 때 `addProject()`와 같은 메서드를 사용하여 N:M 관계를 이용할 수 있습니다.

```javascript
(async () => {
  try {
    const user = await User.create({ username: 'John' });
    const project = await Project.create({ projectName: 'Project A' });

    // N:M 관계를 이용하여 데이터 추가
    await user.addProject(project);

    console.log('Data added successfully.');
  } catch (error) {
    console.error('Error adding data:', error);
  } finally {
    await sequelize.close();
  }
})();
```

## 관계에서 어떤 table과 연관된 정보를 함께 가져오려면 어떻게 해야할까? include를 사용하면 된다.

```javascript
const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
```
이렇게 include로 join하면, Post 객체에 User 객체가 담겨서 리턴된다.

## table 검색과 관계 검색에서 `include` 옵션의 값이 배열인지 아닌지 차이가 있었다. 왜 그렇지? 1:N 관계, N:M 관계라는 차이가 있어서 그렇더라.

`include` 옵션의 값이 하나는 배열 형태로 되어 있고 다른 하나는 배열 형태로 되어 있지 않은 이유에는 Sequelize에서 관계를 다루는 방식과 관련이 있습니다. 이 두 코드 조각은 서로 다른 관계 형태를 다루고 있기 때문에 `include` 옵션의 구조가 조금 다를 수 있습니다.

1. 첫 번째 코드 조각:

```javascript
const posts = await Post.findAll({
    include: {
        model: User,
        attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
});
```

이 코드는 `Post` 모델의 게시물을 조회할 때, 관련된 `User` 모델을 포함시키는 작업을 수행합니다. 관계가 1:N (한 사용자가 여러 게시물을 가질 수 있음) 또는 N:M (여러 사용자가 여러 게시물에 관여할 수 있음)인 경우, 단일 객체나 배열로 표현됩니다. 따라서 `include` 옵션에는 단일 객체로 표현됩니다. `User` 모델을 포함하여 가져오고, `attributes` 속성을 사용하여 사용자의 'id'와 'nick' 속성을 선택적으로 가져옵니다.

2. 두 번째 코드 조각:

```javascript
posts = await hashtag.getPosts({
    include: [
        {
            model: User,
        },
    ],
    order: [["createdAt", "DESC"]],
});
```

이 코드는 `hashtag` 모델의 게시물을 조회할 때, 관련된 `User` 모델을 포함시키는 작업을 수행합니다. 여기서 `getPosts` 메서드는 해당 `hashtag` 모델의 관계를 가져오는 커스텀 메서드로서, Sequelize에서 관계 모델을 가져올 때 배열 형태로 정의됩니다. 이 메서드를 사용하여 특정 hashtag와 관련된 게시물을 가져오고, `User` 모델을 포함하여 가져옵니다.

결론적으로, `include` 옵션의 값이 배열인지 아닌지는 Sequelize의 관계 형태와 사용되는 메서드에 따라 다르게 결정됩니다.

## res.locals의 정보들은 자동으로 res.render으로 뷰를 렌더링할 때 자동으로 포함된다.

네, 맞습니다. `res.locals` 객체에 저장된 정보는 Express.js에서 `res.render()` 메서드를 사용하여 뷰(템플릿)를 렌더링할 때 자동으로 포함됩니다. 이를 통해 뷰 템플릿에서 해당 정보에 접근하고 활용할 수 있습니다.

`res.locals` 객체는 미들웨어나 라우터에서 설정된 로컬 변수들을 담고 있는 객체입니다. 이 객체에 저장된 데이터는 해당 요청의 수명 주기 동안 유효하며, 같은 요청 내에서 다양한 미들웨어 및 라우터에서 공유되는 데이터를 저장하는 데 사용됩니다.

예를 들어, 다음과 같이 `res.locals`에 데이터를 설정하면, 해당 데이터는 템플릿에서 접근 가능합니다:

```javascript
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // 현재 로그인한 사용자 정보를 저장
  next();
});
```

위 코드에서 `res.locals.currentUser`에 `req.user` 데이터를 저장한 후, `res.render()` 메서드를 호출하여 템플릿을 렌더링하면, 해당 템플릿에서 `currentUser` 변수에 접근하여 현재 로그인한 사용자 정보를 활용할 수 있습니다.

```javascript
// 템플릿 엔진을 사용하는 예시 (예: EJS)
<h1>Welcome, <%= currentUser.username %></h1>
```

위 예시에서 `currentUser.username`은 `res.locals`에 저장된 데이터를 템플릿에서 사용하는 방법을 보여줍니다. 이와 유사하게, `res.locals`에 저장된 다른 데이터도 템플릿에서 활용할 수 있습니다.

## include는 join 연산인데, 생각하기 좀 복잡하다. 정리해서 지금은 이해했는데, 계속 복습해야 한다. deserializeUser 부분.


## sequelize 관계를 제거하는 방법.
관계가 다음과 같을 때,
```javascript
db.User.belongsToMany(db.User, {
        foreignKey: "followingId",
        as: "Followers",
        through: "Follow",
    });
db.User.belongsToMany(db.User, {
    foreignKey: "followerId",
    as: "Followings",
    through: "Follow",
});
```

**1. destroy 메서드 사용:**
```javascript
const A = await db.User.findByPk(aId); // A의 정보 가져오기
const B = await db.User.findByPk(bId); // B의 정보 가져오기

// A가 B를 언팔로우하기
await db.Follow.destroy({
  where: {
    followerId: A.id,
    followingId: B.id
  }
});

// B가 A를 언팔로우하기
await db.Follow.destroy({
  where: {
    followerId: B.id,
    followingId: A.id
  }
});
```

**2. removeFollowings 및 removeFollowers 메서드 사용:**

```javascript
const A = await db.User.findByPk(aId); // A의 정보 가져오기
const B = await db.User.findByPk(bId); // B의 정보 가져오기

// A가 B를 언팔로우하기
await A.removeFollowings(B);

// B가 A를 언팔로우하기
await B.removeFollowers(A);
```

두 가지 방법 모두 팔로우 관계를 해제하기 위한 방법입니다. 첫 번째 방법은 직접 `sequelize`의 `destroy` 메서드를 사용하여 연결 테이블의 특정 행을 삭제하는 것이고, 두 번째 방법은 모델 인스턴스의 메서드인 `removeFollowings`와 `removeFollowers`를 사용하여 관련된 행을 삭제하는 방법입니다. 선택하신 방법으로 팔로우 관계를 해제하시면 됩니다.
