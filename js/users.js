class UsersModule {
  constructor(selector) {
      this.element = document.querySelector(selector);
      this.http = new CustomHttp();
      this.handleResponse = this.handleResponse.bind(this);
  }

  setClassName(className = 'selected') {
      this.element.classList.add(className);
      return this;
  }

  getUsersFragment(list) {
      const usersFragment = document.createDocumentFragment();
      list.forEach(user => {
      const pEl = document.createElement("p");
      pEl.addEventListener('click', (event) => {
          if (event.target.classList.contains('info')) {
              event.target.classList.toggle('info');
              pEl.innerHTML = `<b>Name:</b> ${user.name}`;
          } else {
              event.target.classList.add('info'); 
              pEl.innerHTML =
                `<b>Name:</b> ${user.name}
                </br><b>Username:</b>${user.username}
                </br><b>Email:</b>${user.email}
                </br><b>Phone:</b>${user.phone}
                </br><b>Website:</b>${user.website}`;
          }
      });
      pEl.innerHTML = `<b>Name:</b> ${user.name}`;
      usersFragment.appendChild(pEl);
      });

      return usersFragment;
  }

  setUsers(list) {
      const fragment = this.getUsersFragment(list)
      this.element.innerHTML = '';
      this.element.append(fragment);
  }

  handleResponse(list) {
      this.setUsers(list);
  }

  getUsers() {
      this.element.innerHTML = 'loading....';
      this.http.get('https://jsonplaceholder.typicode.com/users', this.handleResponse)
  }
}