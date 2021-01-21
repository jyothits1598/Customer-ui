import { ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    storedRouteHandles = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return route.data.reuseRoute === true;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRouteHandles.set(this.getKey(route, route.data.key), handle);
        console.log(this.storedRouteHandles);
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('should attach condition', (route.data.reuseRoute === true) && !!this.storedRouteHandles.get(this.getKey(route, route.data.key)))
        return (route.data.reuseRoute === true) && !!this.storedRouteHandles.get(this.getKey(route, route.data.key));
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        let condition = route.routeConfig ? this.storedRouteHandles.get(this.getKey(route, route.data.key)) : null;
        console.log('retrieve condition', condition);
        if (route.routeConfig) return this.storedRouteHandles.get(this.getKey(route, route.data.key));
        else return null;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false;
    }

    private getKey(route: ActivatedRouteSnapshot, key: string): string {
        // console.log('get key', route.queryParams)
        console.log('get key', route.url + Object.values(route.queryParams).join('') + key);
        return Object.values(route.queryParams).join('') + key
    }


}
// import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

// export class CustomRouteReuseStrategy implements RouteReuseStrategy {
//     storedRouteHandles = new Map<string, DetachedRouteHandle>();

//     shouldDetach(route: ActivatedRouteSnapshot): boolean {
//         return route.data.reuseRoute === true;
//     }
//     store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
//         this.storedRouteHandles.set(route.data.key, handle);
//     }
//     shouldAttach(route: ActivatedRouteSnapshot): boolean {
//         return (route.data.reuseRoute === true) && !!this.storedRouteHandles.get(route.data.key);
//     }
//     retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
//         if (route.routeConfig) return this.storedRouteHandles.get(route.data.key);
//         else return null;
//     }
//     shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//         return false;
//     }

//     private getKey(route: ActivatedRouteSnapshot): string {
//         return route.pathFromRoot
//             .map((snapshot: ActivatedRouteSnapshot) => snapshot.routeConfig ? snapshot.routeConfig.path : '')
//             .filter((path: string) => path.length > 0)
//             .join('');
//     }


// }