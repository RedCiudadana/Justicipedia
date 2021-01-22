import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

class ApplicationController extends Controller {
    queryParams = ['embed'];
    @tracked embed = false;
}

export default ApplicationController;