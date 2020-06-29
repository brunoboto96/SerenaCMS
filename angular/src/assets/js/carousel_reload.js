function carousel_reload() {
    $(carousel).carousel("pause").removeData();
    $(carousel).carousel(target_slide_index);
}