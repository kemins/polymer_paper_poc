/**
 * Created by andriy_kemin on 12/2/2014.
 */
function validatePaperInputDecorators($element){
    var formInputs = $element.find('paper-input-decorator');
    var res = true;
    formInputs.each(function() {
        var valid = !(this.isInvalid = !$(this).find('input, textarea')[0].validity.valid);
        res = res && valid;
    });

    return res;
}