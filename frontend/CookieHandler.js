class CookieHandler {
    static setBooleanCookie(name, value, days) {
        const booleanValue = value ? 'true' : 'false';
        this.setCookie(name, booleanValue, days);
    }

    static getBooleanCookie(name) {
        const cookieValue = this.getCookie(name);
        return cookieValue === 'true';
    }

    static setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    static getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
    static getDefaultOptions() {
        return {
            preload_light_theme: true,
            preload_lift: true,
            preload_times_enabled: true,
            preload_transfer_minutes: 10
        };
    }
}
