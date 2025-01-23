import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => { 
      const token = document.cookie
        .match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')
        ?.pop() || '';

      
      const modifiedReq = req.clone({
        headers: req.headers
        .set('X-CSRFToken', token).
        set('Authorization', 'Bearer ' 
          + sessionStorage.getItem('sesionToken') || ''),
        withCredentials: true
      });
      return next(modifiedReq);
    
};



