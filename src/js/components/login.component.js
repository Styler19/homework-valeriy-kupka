import { AuthService } from './../services';
import { Routing } from './../core';
import { NotificationComponent } from './notification.component';
import { LoaderComponent } from './loader.component';

export class LoginComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
        this._notificationComponent = new NotificationComponent();
        this._loaderComponent = new LoaderComponent();

        this.beforeRender = this.beforeRender.bind(this)
        this.afterRender = this.afterRender.bind(this)
    }

    beforeRender() {
        if (this._authService.token) {
            this._routing.navigate(`/users/${this._authService.userId}`)
        }
    }

    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Login to Social.</h3>
                <p class="text-secondary">Enter your e-mail address & password to login to your Social account.</p>
                <form name="loginForm" novalidate>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm" id="submit_button">Login</button>
                            <div id="loader-container" class="ml-auto"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="auth-bg col col-6">
                <div class="notification-container"></div>
            </div>
        </div>
        `;
    }

    afterRender() {
        document.forms['loginForm'].addEventListener('submit', async (e) => {
            e.preventDefault();
            this._notificationComponent.setContainer(document.querySelector('div.notification-container'));
            this._loaderComponent.setContainer(document.querySelector('div#loader-container'));

            const email = e.target.elements['email'].value;
            const password = e.target.elements['password'].value;

            if (!email || !password)
                return this._notificationComponent.setNotification({headline: 'Not all fields are filled!', text: 'Please fill in the fields.'}, 'danger');
            if ( e.target.elements['password'].value.length < 8 )
                return this._notificationComponent.setNotification({headline: 'Password must be min 8 char length!', text: 'Please fill in the fields correctly.'}, 'danger');

            e.target.elements['submit_button'].disabled = true;                    // Disable button
            this._loaderComponent.setLoader();

            try {
                const response = await this._authService.login(email, password)
                this._loaderComponent.removeLoader()
                e.target.elements['submit_button'].disabled = false;
                this._routing.navigate(`/users/${response.id}`)
            }
            catch(error) {
                this._loaderComponent.removeLoader()
                e.target.elements['submit_button'].disabled = false;
                this._notificationComponent.setNotification({headline: 'Login error!', text: error.message}, 'danger', 16000);
            }
        });
    }
}