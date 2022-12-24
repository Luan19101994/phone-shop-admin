var listProduct = [];
const renderProduct = (products) => {
    document.getElementById("listProduct").innerHTML = ``
    for (const [index, product] of products.entries()) {
        document.getElementById("listProduct").innerHTML += `
        <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>
                <img src="${product.img}" alt="" />
              </td>
              <td>${product.desc}</td>
              <td>
                    <div class="d-flex align-items-center justify-content-center" style="gap: 20px">
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')"><svg viewBox="0 0 24 24" width="24" height="24" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                  <button class="btn btn-info" onclick="getDetail('${product.id}')" data-toggle="modal"
                  data-target="#modalEdit"><svg viewBox="0 0 24 24" width="24" height="24" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>
                  </div>
              </td>
          </tr>
    `
    }
}
const getData = async () => {
    $("#loading").html(`
            <div class="container">
                <div class="bar"></div>
            </div>`)
    fetch('https://63a6cb1759fd83b1bb380955.mockapi.io/api/v1/all')
        .then(response => response.json())
        .then(json => { listProduct = json; renderProduct(json); $("#loading").html(``) })
}
const getDetail = async (id) => {
    let product = {}
    await fetch(`https://63a6cb1759fd83b1bb380955.mockapi.io/api/v1/all/${id}`)
        .then(response => response.json())
        .then(json => {
            $("input#nameEdit").attr("value", json.name);
            $("input#priceEdit").attr("value", json.price);
            $("input#screenEdit").attr("value", json.screen);
            $("input#backCameraEdit").attr("value", json.backCamera);
            $("input#frontCameraEdit").attr("value", json.frontCamera);
            $("input#imgEdit").attr("value", json.img);
            $("input#descEdit").attr("value", json.desc);
            $("input#typeEdit").attr("value", json.type);
            $('#modalEdit').click();
            $('#idProduct').html(json.id)
        })
    return product;
}
const deleteProduct = async (id) => {
    await fetch(`https://63a6cb1759fd83b1bb380955.mockapi.io/api/v1/all/${id}`, {
        method: 'DELETE',
    });

    await getData()
}
const addProduct = async () => {
    let product = {
        name: $("input#name").val(),
        price: $("input#price").val(),
        screen: $("input#screen").val(),
        backCamera: $("input#backCamera").val(),
        frontCamera: $("input#frontCamera").val(),
        img: $("input#img").val(),
        desc: $("#desc").val(),
        type: $("#type").val()
    }
    await fetch('https://63a6cb1759fd83b1bb380955.mockapi.io/api/v1/all', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    await getData()
}

const updateProduct = async () => {
    let product = {
        name: $("input#nameEdit").val(),
        price: $("input#priceEdit").val(),
        screen: $("input#screenEdit").val(),
        backCamera: $("input#backCameraEdit").val(),
        frontCamera: $("input#frontCameraEdit").val(),
        img: $("input#imgEdit").val(),
        desc: $("#descEdit").val(),
        type: $("#typeEdit").val()
    }
    await fetch(`https://63a6cb1759fd83b1bb380955.mockapi.io/api/v1/all/${$('#idProduct').text()}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    await getData()
}
getData()