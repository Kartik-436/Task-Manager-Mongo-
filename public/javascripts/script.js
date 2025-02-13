document.addEventListener("DOMContentLoaded", () => {
    function openEditModal(title, details) {
        const modal = document.getElementById("editModal");
        modal.classList.remove("hidden");

        document.getElementById("originalTitle").value = title;
        document.getElementById("editTitle").value = title;
        document.getElementById("editDetails").value = details;

        gsap.set(".modal-content", { scale: 0, opacity: 0, y: 500 });

        gsap.to(".modal-content", {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.75)"
        });
    }

    function closeEditModal() {
        gsap.to(".modal-content", {
            scale: 0,
            opacity: 0,
            y: 500,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                document.getElementById("editModal").classList.add("hidden");
            }
        });
    }

    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault();
        closeEditModal();
        
        setTimeout(() => {
            this.submit();
        }, 300);
    });

    document.getElementById("closeModal").addEventListener("click", closeEditModal);

    document.getElementById("editForm").addEventListener("submit", function (e) {
        closeEditModal();
    });

    function deleteTask(form) {
        const taskDiv = form.closest(".task"); 

        gsap.to(taskDiv, {
            y: 20, 
            z: 100,
            duration: 0.4,
            ease: "power1.out",
            onComplete: () => {
                gsap.to(taskDiv, {
                    z: 100,
                    x: 500, 
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        form.submit(); 
                    }
                });
            }
        });
    }

    function animateNewTask(taskElement) {
        gsap.set(taskElement, { scale: 0.5, opacity: 0, y: 20 });
        gsap.to(taskElement, { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "elastic.out(1, 0.75)" 
        });
    }

    function checkForNewTasks() {
        const tasks = document.querySelectorAll(".task.hidden");
        tasks.forEach(task => {
            task.classList.remove("hidden");
            animateNewTask(task);
        });
    }

    setTimeout(checkForNewTasks, 300);

    window.deleteTask = deleteTask;
    window.openEditModal = openEditModal;
});
