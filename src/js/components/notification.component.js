export class NotificationComponent {
    setContainer(container) {
        this.container = container;
    }

    setNotification(message, type, time = '4000') {                 // Alert types: success, info, warning, danger
        const notificationId = this.getDataId();

        if (this.container.querySelectorAll('div[data-id]').length >= 3) return;

        this.container.innerHTML += `
        <div data-id="${notificationId}" class="alert alert-${type}" role="alert">
            <strong>${message.headline}</strong> ${message.text}
        </div>
        `;
        setTimeout(() => { this.removeNotification(notificationId) }, time);
    }

    getDataId() {
        const template = 'xxxx-xxxx-xxxx-xxxx';
        
        const arrayFromTemplate = template.split('');
        return arrayFromTemplate.reduce((init, char) => {
            if (char === '-') return init += char
        
            return init += Math.floor(Math.random() * 10)
        }, '');
    }

    removeNotification(notificationId) {
        const notification = document.querySelector(`[data-id="${notificationId}"]`);
        if (notification) this.container.removeChild(notification);
    }
}